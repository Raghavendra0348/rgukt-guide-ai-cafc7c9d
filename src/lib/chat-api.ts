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
  if (lower.includes('sgpa') || lower.includes('grade') || lower.includes('gpa')) {
    return `**RGUKT SGPA Calculation:**

RGUKT calculates SGPA (Semester Grade Point Average) based on credits and grade points earned in each subject.

**SGPA Formula:**
SGPA = (Sum of [Credits × Grade Point for each subject]) / (Total Credits for the semester)

**Grade System & Grade Points:**
- **Excellent (Ex)** → Grade Point: 10
- **A** → Grade Point: 9
- **B** → Grade Point: 8
- **Failed/Remedial (F/R)** → Grade Point: 0

**Example Calculation:**

Semester with 20 total credits:
1. Mathematics (4 credits) - Grade: Ex → 4 × 10 = 40
2. Physics (4 credits) - Grade: A → 4 × 9 = 36
3. Chemistry (3 credits) - Grade: B → 3 × 8 = 24
4. Programming (4 credits) - Grade: Ex → 4 × 10 = 40
5. English (3 credits) - Grade: A → 3 × 9 = 27
6. Workshop (2 credits) - Grade: F → 2 × 0 = 0

**Calculation:**
- Sum = 40 + 36 + 24 + 40 + 27 + 0 = 167
- Total Credits = 20
- **SGPA = 167 / 20 = 8.35**

**Note:** If you fail a subject (Remedial/F), it gets 0 grade points but the credits are still counted in the total credits.`;
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

    // System prompt with RGUKT-specific knowledge
    const systemPrompt = `You are Medha AI, an intelligent assistant for RGUKT (Rajiv Gandhi University of Knowledge Technologies) students. 

IMPORTANT INFORMATION ABOUT RGUKT SGPA CALCULATION:
- RGUKT uses a credit-based grading system with grade points
- Each course has specific credits (typically 3-4 credits per subject)
- Grades and Grade Points: Excellent (Ex) = 10, A = 9, B = 8, Failed/Remedial (F/R) = 0
- SGPA Formula: SGPA = (Sum of [Credits × Grade Point for each subject]) / (Total Credits for the semester)
- Example: If you have 3 subjects:
  * Math (4 credits, Ex grade): 4 × 10 = 40
  * Physics (4 credits, A grade): 4 × 9 = 36
  * Chemistry (4 credits, B grade): 4 × 8 = 32
  * Total: (40 + 36 + 32) / 12 = 108 / 12 = 9.0 SGPA
- If you fail a subject, it gets 0 grade points but the credits are still counted in total credits
- Example with failure: If Chemistry was Failed: (40 + 36 + 0) / 12 = 76 / 12 = 6.33 SGPA

FORMATTING GUIDELINES:
- Use clear text formatting with bullet points and numbered lists
- Use tables when showing data (use markdown table format)
- Use bold (**text**) for emphasis
- Do NOT use Mermaid diagrams or flowcharts unless specifically requested
- Keep responses clear, concise, and easy to read

Be helpful, accurate, and provide specific information about RGUKT campus life, academics, facilities, and procedures.`;

    const resp = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'model',
            parts: [{ text: 'Understood. I am Medha AI, your RGUKT campus assistant. I will provide accurate information about RGUKT, including the correct SGPA calculation method where SGPA = (Sum of [Credits × Grade Point]) / (Total Credits), with grades Ex=10, A=9, B=8, F/R=0. How can I help you today?' }]
          },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'model',
            parts: [{ text: m.content }]
          }))
        ]
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
