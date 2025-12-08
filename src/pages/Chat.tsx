import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, BookOpen, GraduationCap, CalendarDays, Building2 } from "lucide-react";
import { toast } from "sonner";
import { streamChat, type Message } from "@/lib/chat-api";

interface ChatMessageType {
  id: string;
  role: "user" | "assistant";
  content: string;
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
  content: `Hello! 👋 I'm VALL-E-ASSIST, your AI-powered campus companion for RGUKT RK Valley.

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

  const handleSend = async (content: string) => {
    const userMessage: ChatMessageType = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Build message history for API (excluding welcome message)
    const apiMessages: Message[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    apiMessages.push({ role: "user", content });

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
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-foreground">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">Powered by Gemini</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              New Chat
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 py-6 max-w-3xl">
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
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
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 text-left transition-smooth group disabled:opacity-50"
                  >
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm text-foreground group-hover:text-primary transition-smooth">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 max-w-3xl">
            <ChatInput onSend={handleSend} isLoading={isLoading} />
            <p className="text-xs text-muted-foreground text-center mt-3">
              VALL-E-ASSIST provides general guidance. Please verify important information with official sources.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
