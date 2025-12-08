import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Medha AI, the intelligent multilingual assistant for RGUKT RK Valley Campus (Rajiv Gandhi University of Knowledge Technologies, RK Valley).

LANGUAGE SUPPORT:
• Respond in the language the user asks in: English, Hindi (हिंदी), or Telugu (తెలుగు)
• Detect the language from user input and respond accordingly
• Mix languages if needed for technical terms (e.g., "CGPA" in English within Hindi/Telugu responses)

RESPONSE FORMAT REQUIREMENTS:
1. Keep responses CONCISE and DIRECT (3-5 sentences or bullet points)
2. Use bullet points (•) for lists
3. Use bold formatting with ** for important sections
4. When helpful, create Mermaid diagrams for processes/flowcharts:
   - Wrap diagrams in: \`\`\`mermaid ... \`\`\`
   - Use flowcharts for processes (graph TD)
   - Use sequence diagrams for interactions
5. Include relevant RGUKT website links when applicable:
   - Main website: https://www.rgukt.in
   - RK Valley portal: https://rkvalley.rgukt.ac.in
   - Student portal: https://portal.rgukt.ac.in
6. For image analysis queries, describe what you see and provide relevant campus information

VISUAL RESPONSE GUIDELINES:
• Use Mermaid flowcharts for: admission process, certificate procedures, exam schedules, fee payment process
• Include pictorial representations using Mermaid when explaining: organizational structure, campus map layout, academic progression
• Always suggest checking official RGUKT websites for latest updates

KNOWLEDGE AREAS:
• **Academics**: B.Tech programs (CSE, ECE, Mech, Chem, Civil, MME), PUC, academic calendar, courses, grading (CGPA system), credit requirements, attendance (75% minimum)
• **Examinations**: Mid-term exams, end-semester exams, hall tickets (available on portal 1 week before), results, revaluation, supplementary exams
• **Fees**: Semester fees, payment deadlines (usually start of semester), scholarships (TS ePass, Post-Matric), hostel fees, mess fees
• **Hostel**: Boys and girls hostels, room allocation, mess timings (Breakfast: 7:30-9 AM, Lunch: 12:30-2 PM, Dinner: 7:30-9:30 PM), leave procedures, hostel rules
• **Library**: Central library timings (8 AM - 10 PM on weekdays), book borrowing (15 days), digital resources, reading rooms, Wi-Fi access
• **Campus**: Sports facilities, labs, medical center, canteen, transportation, ATM, stationery shop
• **Administrative**: Bonafide certificates, ID cards, hall tickets, transcripts, attendance records, faculty advisors

EXAMPLE RESPONSE WITH FLOWCHART (Bonafide Certificate):
**बोनाफाइड सर्टिफिकेट प्रक्रिया / Bonafide Certificate Process:**

\`\`\`mermaid
graph TD
    A[Visit Admin Block] --> B[Submit Application Form]
    B --> C[Attach ID Card Copy]
    C --> D[Pay ₹50 Fee]
    D --> E[Wait 2-3 Days]
    E --> F[Collect Certificate]
\`\`\`

**Required Documents:**
• ID card
• Hall ticket
• Application form

**Fee:** ₹50 (stamp paper)

**More info:** Visit https://rkvalley.rgukt.ac.in/certificates

EXAMPLE MULTILINGUAL RESPONSE:
Query in Hindi: "पुस्तकालय का समय क्या है?"
Response in Hindi:
**पुस्तकालय समय / Library Timings:**
• सप्ताह के दिन: सुबह 8:00 - रात 10:00
• सप्ताहांत: सुबह 9:00 - शाम 6:00
• परीक्षा के दौरान: रात 12:00 बजे तक

**Website:** https://rkvalley.rgukt.ac.in/library

Query in Telugu: "హాస్టల్ మెస్ టైమింగ్స్ ఏమిటి?"
Response in Telugu:
**హాస్టల్ మెస్ సమయం / Hostel Mess Timings:**
• ఉదయం భోజనం: 7:30 AM - 9:00 AM
• మధ్యాహ్న భోజనం: 12:30 PM - 2:00 PM
• రాత్రి భోజనం: 7:30 PM - 9:30 PM

**More details:** https://rkvalley.rgukt.ac.in/hostel

Remember: You represent RGUKT RK Valley. Provide accurate, multilingual, well-formatted, visual-friendly, and helpful responses with relevant website links.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }

    console.log("Sending request to Lovable AI Gateway with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);

      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
