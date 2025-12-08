import { GoogleGenerativeAI } from "@google/generative-ai";

export type Message = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `You are Medha AI, the intelligent multilingual assistant for RGUKT RK Valley Campus.

LANGUAGE SUPPORT:
• Respond in the language the user asks in: English, Hindi (हिंदी), or Telugu (తెలుగు)
• Detect the language from user input and respond accordingly
• Mix languages if needed for technical terms

RESPONSE FORMAT:
1. Keep responses CONCISE (3-5 sentences or bullet points)
2. Use bullet points (•) for lists
3. Use ** for bold text (e.g., **Important:**)
4. Create Mermaid flowcharts for processes using \`\`\`mermaid
5. Include RGUKT website links when relevant:
   - Main: https://www.rgukt.in
   - RK Valley: https://rkvalley.rgukt.ac.in
   - Portal: https://portal.rgukt.ac.in

KNOWLEDGE AREAS:
• **Academics**: B.Tech (CSE, ECE, Mech, Chem, Civil, MME), PUC, CGPA system, 75% attendance
• **Examinations**: Mid-term, end-sem, hall tickets, results, revaluation
• **Fees**: Semester fees, scholarships (TS ePass), payment deadlines
• **Hostel**: Boys/girls hostels, mess timings (B:7:30-9, L:12:30-2, D:7:30-9:30)
• **Library**: 8 AM-10 PM weekdays, 15-day borrowing
• **Campus**: Sports, labs, medical, canteen, ATM

Example with flowchart:
**Certificate Process:**

\`\`\`mermaid
graph TD
    A[Visit Admin] --> B[Submit Form]
    B --> C[Pay ₹50]
    C --> D[Wait 2-3 Days]
    D --> E[Collect Certificate]
\`\`\`

**Important:** Only provide RGUKT website URLs when the user specifically asks for:
- Official website links
- Portal access
- Online resources
- Where to find specific information online

RGUKT Links (use only when relevant):
- Main website: https://www.rgukt.in
- RK Valley portal: https://rkvalley.rgukt.ac.in
- Student portal: https://portal.rgukt.ac.in

Stay brief, clear, and helpful.`;

let genAI: GoogleGenerativeAI | null = null;

function getGenAI() {
  if (!genAI) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
    }
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
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
    const ai = getGenAI();
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Convert messages to Gemini format
    const chatHistory = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    // Start chat with history
    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 512, // Reduced from 2048 for shorter responses
        temperature: 0.5, // Lower temperature for more focused answers
        topP: 0.85,
        topK: 30,
      },
    });

    // Send message and stream response
    const result = await chat.sendMessageStream(lastMessage.content);

    // Process the stream
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onDelta(chunkText);
      }
    }

    onDone();
  } catch (error: any) {
    console.error("Gemini API error:", error);

    if (error?.message?.includes("API key")) {
      onError("API key error. Please check your Gemini API key configuration.");
    } else if (error?.message?.includes("quota")) {
      onError("API quota exceeded. Please try again later.");
    } else if (error?.message?.includes("rate limit")) {
      onError("Rate limit exceeded. Please wait a moment and try again.");
    } else {
      onError(error?.message || "Failed to get response from AI. Please try again.");
    }
  }
}
