import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, BookOpen, GraduationCap, CalendarDays, Building2 } from "lucide-react";
import { toast } from "sonner";
import { streamChat, type Message } from "@/lib/gemini-api";

interface ChatMessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
  image?: string;
}

const quickPrompts = [
  { icon: GraduationCap, label: "Academic calendar", prompt: "What is the academic calendar for this semester? Include important dates." },
  { icon: BookOpen, label: "Exam schedule", prompt: "What is the examination schedule and how can I get my hall ticket?" },
  { icon: CalendarDays, label: "Fee deadlines", prompt: "What are the fee payment deadlines and available payment methods?" },
  { icon: Building2, label: "Hostel rules", prompt: "What are the hostel rules and regulations at RGUKT RK Valley?" },
];

const welcomeMessage: ChatMessageType = {
  id: "welcome",
  role: "assistant",
  content: `Hello! 👋 I'm Medha AI, your intelligent campus assistant for RGUKT RK Valley.

I can help you with:
• **Academic queries** — courses, grades, schedules, departments
• **Examination information** — schedules, hall tickets, results
• **Fee and payment details** — deadlines, structure, scholarships
• **Hostel and mess guidelines** — rules, timings, procedures
• **Library resources** — timings, issuing rules, digital access
• **Administrative procedures** — certificates, bonafide letters

How can I assist you today?`,
};

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessageType[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string, image?: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
      image,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Build message history for API (excluding welcome message)
    const apiMessages: Message[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    apiMessages.push({ role: "user", content: image ? `${content}\n[Image provided for analysis]` : content });

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    // Add empty assistant message that will be updated
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    await streamChat({
      messages: apiMessages,
      onDelta: (chunk) => {
        assistantContent += chunk;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: assistantContent } : m
          )
        );
      },
      onDone: () => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        // Remove the empty assistant message
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        toast.error("Failed to get response", {
          description: error,
        });
      },
    });
  };

  const handleReset = () => {
    setMessages([welcomeMessage]);
  };

  return (
    <div className="min-h-screen bg-[#2b2929] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 flex flex-col relative">
        {/* Floating New Chat Button */}
        <div className="absolute top-24 right-6 z-10">
          <Button
            size="icon"
            onClick={handleReset}
            className="h-14 w-14 rounded-full bg-gradient-to-br from-[#8439c5] to-purple-700 hover:from-[#8439c5]/90 hover:to-purple-800 shadow-2xl hover:shadow-[#8439c5]/50 transition-all border-2 border-[#8439c5]/30"
            title="New Chat"
          >
            <span className="text-3xl font-light text-white">+</span>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-[#2b2929]">
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  image={message.image}
                  isLoading={isLoading && message.role === "assistant" && message.content === ""}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Quick Prompts */}
        {messages.length === 1 && (
          <div className="container mx-auto px-4 max-w-3xl pb-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {quickPrompts.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleSend(item.prompt)}
                    disabled={isLoading}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1a1818] border-2 border-[#8439c5]/30 hover:border-[#8439c5] hover:bg-[#8439c5]/10 text-center transition-all disabled:opacity-50 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8439c5]/20 to-purple-700/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-[#8439c5]" />
                    </div>
                    <span className="text-xs text-[#e3e3e3] font-medium group-hover:text-white transition-colors">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t-2 border-[#8439c5]/30 bg-[#1a1818]">
          <div className="container mx-auto px-4 py-5 max-w-3xl">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
            <p className="text-xs text-[#e3e3e3]/60 text-center mt-3">
              Medha AI • Powered by Gemini AI • Supports English, Hindi & Telugu
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
