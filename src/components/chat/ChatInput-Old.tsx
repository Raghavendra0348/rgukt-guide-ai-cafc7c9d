import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Sparkles } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

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
    <form onSubmit={handleSubmit} className="relative group">
      <div className={`relative rounded-3xl transition-all duration-300 ${
        isFocused 
          ? 'shadow-lg shadow-purple-500/30 ring-2 ring-purple-500/50' 
          : 'shadow-md shadow-black/50'
      }`}>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask me anything about RGUKT... 💬"
          className="pr-16 min-h-[70px] max-h-[200px] resize-none bg-gray-900/80 border-gray-700/50 text-white placeholder:text-gray-500 rounded-3xl focus:bg-gray-900 focus:border-purple-500/50 backdrop-blur-sm transition-all duration-300"
          disabled={disabled || isLoading}
        />
        {isFocused && (
          <div className="absolute -top-8 left-4 flex items-center gap-2 text-xs text-purple-400 animate-in slide-in-from-bottom-2">
            <Sparkles className="w-3 h-3" />
            <span>Press Enter to send, Shift+Enter for new line</span>
          </div>
        )}
      </div>
      <Button
        type="submit"
        size="icon"
        className={`absolute right-2 bottom-2 h-12 w-12 rounded-full transition-all duration-300 ${
          input.trim() && !isLoading && !disabled
            ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/50'
            : 'bg-gray-800 text-gray-500'
        }`}
        disabled={!input.trim() || isLoading || disabled}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Send className="w-5 h-5" />
        )}
      </Button>
    </form>
  );
}
