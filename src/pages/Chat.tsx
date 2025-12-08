import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { Button } from "@/components/ui/button";
import { Sparkles, RotateCcw, BookOpen, GraduationCap, CalendarDays, Building2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  { icon: GraduationCap, label: "Academic calendar", prompt: "When does the current semester end?" },
  { icon: BookOpen, label: "Exam schedule", prompt: "What is the examination schedule for this semester?" },
  { icon: CalendarDays, label: "Fee deadlines", prompt: "What are the fee payment deadlines?" },
  { icon: Building2, label: "Hostel rules", prompt: "What are the hostel rules and regulations?" },
];

const welcomeMessage: Message = {
  id: "welcome",
  role: "assistant",
  content: `Hello! 👋 I'm VALL-E-ASSIST, your AI-powered campus companion for RGUKT RK Valley.

I can help you with:
• Academic queries (courses, grades, schedules)
• Examination information
• Fee and payment details
• Hostel and mess guidelines
• Library resources
• And much more!

How can I assist you today?`,
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual Gemini API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `Thank you for your question about "${content}". 

This is a demo response. Once connected to Lovable Cloud and the Gemini API, I'll provide accurate, cited answers from official RGUKT documents.

The RAG (Retrieval-Augmented Generation) system will:
1. Search through official RGUKT documents
2. Find relevant information
3. Generate a precise, sourced response

Would you like to know anything else?`,
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
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
                />
              ))}
              {isLoading && (
                <ChatMessage role="assistant" content="" isLoading />
              )}
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
                    className="flex items-center gap-2 p-3 rounded-xl bg-muted hover:bg-muted/80 text-left transition-smooth group"
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
              VALL-E-ASSIST may occasionally provide inaccurate information. Please verify important details.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
