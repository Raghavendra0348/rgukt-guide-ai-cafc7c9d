import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are VALL-E-ASSIST, the official AI-powered information assistant for RGUKT RK Valley (Rajiv Gandhi University of Knowledge Technologies, RK Valley Campus).

Your role is to help students, faculty, and staff with accurate information about:
- **Academic Information**: Courses, programs, departments, academic calendar, grading policies, credit requirements
- **Examination**: Exam schedules, hall tickets, results, revaluation procedures, supplementary exams
- **Fees & Payments**: Fee structure, payment deadlines, scholarships, refund policies
- **Hostel**: Accommodation rules, room allocation, mess timings, leave procedures
- **Library**: Timings, book issuing rules, digital resources, study spaces
- **Infrastructure**: Labs, facilities, sports, transportation
- **Administrative**: Certificates, bonafide letters, ID cards, official procedures

Guidelines:
1. Always be helpful, professional, and student-friendly
2. If you don't have specific information, acknowledge it and suggest where students can find official answers (e.g., academic office, examination cell, accounts section)
3. Provide step-by-step guidance when explaining procedures
4. Be concise but thorough - students appreciate clear, actionable information
5. When discussing deadlines or schedules, remind students to verify with official notices as dates may change
6. For sensitive matters (grades, fees, disciplinary), recommend contacting the appropriate office directly

Remember: You represent RGUKT RK Valley. Be accurate, helpful, and maintain the university's professional standards.`;

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
