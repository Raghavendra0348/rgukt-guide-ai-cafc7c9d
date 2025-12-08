import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, Mic, MicOff, Image as ImageIcon, X } from "lucide-react";
import { toast } from "sonner";

interface ChatInputProps {
  onSend: (message: string, image?: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        toast.success("Voice captured!", { description: transcript });
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          toast.error("No speech detected", { description: "Please try again" });
        } else {
          toast.error("Voice input error", { description: "Please try again" });
        }
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((input.trim() || selectedImage) && !isLoading && !disabled) {
      onSend(input.trim() || "Please analyze this image", selectedImage || undefined);
      setInput("");
      setSelectedImage(null);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        toast.error("Image too large", { description: "Please select an image under 4MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast.success("Image selected", { description: "Image ready to send" });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleVoiceInput = () => {
    if (!recognition) {
      toast.error("Voice input not supported", {
        description: "Your browser doesn't support voice input"
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      toast.info("Listening...", { description: "Speak now" });
    }
  };

  // Suggested questions for quick access
  const suggestedQuestions = [
    "What is the academic calendar?",
    "Tell me about hostel facilities",
    "Examination schedule",
    "Fee payment details",
    "Library timings",
    "Placement opportunities"
  ];

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  // Filter suggestions based on input
  useEffect(() => {
    if (input.trim().length > 0) {
      const filtered = suggestedQuestions.filter(q =>
        q.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      {/* Image Preview */}
      {selectedImage && (
        <div className="mb-3 relative inline-block">
          <img
            src={selectedImage}
            alt="Selected"
            className="h-28 w-28 object-cover rounded-xl border-2 border-[#8439c5] shadow-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md transition-all"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#2b2929] border border-[#8439c5]/30 rounded-xl shadow-2xl overflow-hidden z-50 max-h-48 overflow-y-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-[#8439c5]/20 transition-colors text-[#e3e3e3] text-sm border-b border-[#8439c5]/10 last:border-b-0"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => input.length === 0 && setShowSuggestions(false)}
          placeholder="Ask in English, Hindi, or Telugu... 🌐 Type, speak 🎤, or upload image 📷"
          className="pr-40 pl-4 py-4 min-h-[70px] max-h-[200px] resize-none rounded-2xl bg-[#2b2929] border-2 border-[#8439c5]/30 text-white placeholder:text-[#e3e3e3]/50 focus:border-[#8439c5] focus:ring-2 focus:ring-[#8439c5]/50 transition-all shadow-lg"
          disabled={disabled || isLoading}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="absolute right-3 bottom-3 flex gap-2">
          {/* Image Upload Button */}
          <Button
            type="button"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-md transition-all hover:scale-105"
            disabled={disabled || isLoading}
            title="Upload Image"
          >
            <ImageIcon className="w-5 h-5" />
          </Button>

          {/* Voice Input Button */}
          <Button
            type="button"
            size="icon"
            onClick={toggleVoiceInput}
            className={`h-11 w-11 rounded-xl shadow-md transition-all hover:scale-105 ${isListening
              ? "bg-gradient-to-br from-red-600 to-rose-600 animate-pulse"
              : "bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
              }`}
            disabled={disabled || isLoading}
            title="Voice Input"
          >
            {isListening ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#8439c5] to-purple-700 hover:from-[#9547d6] hover:to-purple-800 shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={(!input.trim() && !selectedImage) || isLoading || disabled}
            title="Send Message"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Language Support Indicator */}
      <div className="mt-2 flex items-center justify-center gap-2 text-xs text-[#e3e3e3]/60">
        <span>Supports:</span>
        <span className="px-2 py-0.5 bg-[#8439c5]/20 rounded-full">English</span>
        <span className="px-2 py-0.5 bg-[#8439c5]/20 rounded-full">हिंदी</span>
        <span className="px-2 py-0.5 bg-[#8439c5]/20 rounded-full">తెలుగు</span>
      </div>
    </form>
  );
}
