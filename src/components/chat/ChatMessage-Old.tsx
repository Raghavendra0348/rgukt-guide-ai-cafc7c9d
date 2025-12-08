import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, isLoading }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-all duration-300",
          isUser
            ? "bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/50 group-hover:shadow-purple-500/70 group-hover:scale-110"
            : "bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 shadow-cyan-500/50 group-hover:shadow-cyan-500/70 group-hover:scale-110 animate-pulse"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Bubble */}
      <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
        <span className="text-xs text-gray-500 px-2">
          {isUser ? "You" : "VALL-E AI"}
        </span>
        <div
          className={cn(
            "max-w-[80%] md:max-w-[70%] px-5 py-3 rounded-2xl shadow-lg transition-all duration-300 backdrop-blur-sm",
            isUser
              ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-purple-500/30 hover:shadow-purple-500/50 rounded-br-md"
              : "bg-gradient-to-br from-gray-900/90 to-gray-800/90 text-gray-100 border border-cyan-500/30 shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:border-cyan-500/50 rounded-bl-md"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm text-gray-400">AI is thinking...</span>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
}
