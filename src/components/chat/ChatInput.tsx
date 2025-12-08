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
            className="h-28 w-28 object-cover rounded-2xl border-2 border-purple-300 shadow-lg"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md transition-all hover:scale-110"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50 max-h-48 overflow-y-auto backdrop-blur-sm">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all text-gray-700 text-sm border-b border-gray-100 last:border-b-0 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="relative bg-white rounded-3xl shadow-lg border border-gray-200 p-1 hover:shadow-xl transition-all duration-300">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => input.length === 0 && setShowSuggestions(false)}
          placeholder="Ask me anything about RGUKT... �"
          className="pr-40 pl-6 py-4 min-h-[64px] max-h-[200px] resize-none rounded-3xl bg-transparent border-0 text-gray-800 placeholder:text-gray-400 focus:ring-0 focus:outline-none transition-all"
          disabled={disabled || isLoading}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />

        <div className="absolute right-2 bottom-2 flex gap-1.5">
          {/* Image Upload Button */}
          <Button
            type="button"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 shadow-md transition-all hover:scale-110 hover:rotate-12"
            disabled={disabled || isLoading}
            title="Upload Image"
          >
            <ImageIcon className="w-4.5 h-4.5" />
          </Button>

          {/* Voice Input Button */}
          <Button
            type="button"
            size="icon"
            onClick={toggleVoiceInput}
            className={`h-10 w-10 rounded-full shadow-md transition-all hover:scale-110 ${isListening
              ? "bg-gradient-to-br from-red-400 to-rose-500 animate-pulse ring-4 ring-red-200"
              : "bg-gradient-to-br from-slate-400 to-gray-500 hover:from-slate-500 hover:to-gray-600"
              }`}
            disabled={disabled || isLoading}
            title="Voice Input"
          >
            {isListening ? (
              <MicOff className="w-4.5 h-4.5" />
            ) : (
              <Mic className="w-4.5 h-4.5" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            size="icon"
            className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={(!input.trim() && !selectedImage) || isLoading || disabled}
            title="Send Message"
          >
            {isLoading ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" />
            ) : (
              <Send className="w-4.5 h-4.5" />
            )}
          </Button>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          Type your question
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Upload image
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
          Use voice
        </span>
      </div>
    </form>
  );
}
