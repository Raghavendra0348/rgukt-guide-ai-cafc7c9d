import { Bot, User } from "lucide-react";
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
                                "flex gap-3",
                                isUser ? "flex-row-reverse" : "flex-row"
                        )}
                >
                        {/* Avatar */}
                        <div
                                className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                        isUser
                                                ? "bg-gray-700"
                                                : "bg-blue-600"
                                )}
                        >
                                {isUser ? (
                                        <User className="w-4 h-4 text-white" />
                                ) : (
                                        <Bot className="w-4 h-4 text-white" />
                                )}
                        </div>

                        {/* Message Content */}
                        <div className={cn("flex flex-col gap-1", isUser ? "items-end" : "items-start")}>
                                <span className="text-xs text-gray-500 px-1">
                                        {isUser ? "You" : "Ask Medha"}
                                </span>
                                <div
                                        className={cn(
                                                "max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl",
                                                isUser
                                                        ? "bg-blue-600 text-white rounded-br-md"
                                                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"
                                        )}
                                >
                                        {isLoading ? (
                                                <div className="flex items-center gap-2">
                                                        <div className="flex gap-1">
                                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                                        </div>
                                                        <span className="text-sm text-gray-500">Thinking...</span>
                                                </div>
                                        ) : (
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
                                        )}
                                </div>
                        </div>
                </div>
        );
}
