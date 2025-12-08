export type Message = { role: "user" | "assistant"; content: string };

// Use direct Gemini API instead of Supabase Edge Function
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:streamGenerateContent';

// Mock response generator for when no API key is available
function getMockResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi')) {
    return "Hello! I'm your RGUKT campus assistant. How can I help you today? I can provide information about academics, facilities, campus life, and more.";
  }
  if (lower.includes('hostel') || lower.includes('accommodation')) {
    return "RGUKT provides hostel facilities for all students. The hostels are well-maintained with 24/7 security, mess facilities, and study rooms. Each hostel has wardens to help with student welfare.";
  }
  if (lower.includes('library')) {
    return "The RGUKT library is a modern facility with a vast collection of books, journals, and digital resources. It's open from 8 AM to 10 PM on weekdays and has dedicated study areas for students.";
  }
  if (lower.includes('exam') || lower.includes('test')) {
    return "For exam-related queries, please check the academic calendar on the official RGUKT website or contact your department office. Make sure to keep track of important dates and deadlines.";
  }
  if (lower.includes('fee') || lower.includes('payment')) {
    return "For fee payment information, please visit the accounts section or check your student portal. Fee payment deadlines are strictly enforced, so make sure to pay on time.";
  }

  return "Thank you for your question. As a campus assistant, I can help with information about RGUKT academics, facilities, campus life, and administrative procedures. Could you please provide more specific details about what you'd like to know?";
}

export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  try {
    // If no Gemini API key, use mock responses
    if (!GEMINI_API_KEY) {
      console.log("No API key found, using mock response");
      const mockResponse = getMockResponse(messages[messages.length - 1]?.content || '');

      // Simulate streaming
      const words = mockResponse.split(' ');
      for (const word of words) {
        await new Promise(resolve => setTimeout(resolve, 50));
        onDelta(word + ' ');
      }
      onDone();
      return;
    }

    console.log("Sending chat request to Gemini API");
    console.log("Message count:", messages.length);

    const resp = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        }))
      }),
    });

    // Handle error responses
    if (!resp.ok) {
      const errorData = await resp.json().catch(() => ({}));
      const errorMessage = errorData.error || `Request failed with status ${resp.status}`;

      if (resp.status === 429) {
        onError("Rate limit exceeded. Please wait a moment and try again.");
        return;
      }
      if (resp.status === 402) {
        onError("AI usage limit reached. Please try again later.");
        return;
      }

      onError(errorMessage);
      return;
    }

    if (!resp.body) {
      onError("No response body received");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      // Process line-by-line as data arrives
      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1); // handle CRLF
        if (line.startsWith(":") || line.trim() === "") continue; // SSE comments/keepalive
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          // Incomplete JSON split across chunks: put it back and wait for more data
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }

    // Final flush in case remaining buffered lines arrived without trailing newline
    if (textBuffer.trim()) {
      for (let raw of textBuffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (raw.startsWith(":") || raw.trim() === "") continue;
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          /* ignore partial leftovers */
        }
      }
    }

    onDone();
  } catch (error) {
    console.error("Stream chat error:", error);
    onError(error instanceof Error ? error.message : "Failed to connect to AI service");
  }
}
