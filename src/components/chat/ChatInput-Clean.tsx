import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";

interface ChatInputProps {
        onSend: (message: string) => void;
        isLoading?: boolean;
        disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
        const [input, setInput] = useState("");

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                if (input.trim() && !isLoading && !disabled) {
                        onSend(input.trim());
                        setInput("");
                }
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
                if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit(e);
                }
        };

        return (
                <form onSubmit={handleSubmit} className="relative">
                        <Textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything about RGUKT..."
                                className="pr-14 min-h-[60px] max-h-[200px] resize-none rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                disabled={disabled || isLoading}
                        />
                        <Button
                                type="submit"
                                size="icon"
                                className="absolute right-2 bottom-2 h-10 w-10 rounded-lg bg-blue-600 hover:bg-blue-700"
                                disabled={!input.trim() || isLoading || disabled}
                        >
                                {isLoading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                        <Send className="w-4 h-4" />
                                )}
                        </Button>
                </form>
        );
}
