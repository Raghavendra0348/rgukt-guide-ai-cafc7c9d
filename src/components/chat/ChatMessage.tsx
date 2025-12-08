import { Bot, User, ExternalLink, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  isLoading?: boolean;
}

export function ChatMessage({ role, content, image, isLoading }: ChatMessageProps) {
  const isUser = role === "user";
  const messageRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Initialize and render Mermaid diagrams
  useEffect(() => {
    if (!isUser && content && messageRef.current) {
      // Initialize mermaid
      mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#8439c5',
          primaryTextColor: '#e3e3e3',
          primaryBorderColor: '#8439c5',
          lineColor: '#8439c5',
          secondaryColor: '#2b2929',
          tertiaryColor: '#1a1818',
        }
      });

      // Find all mermaid code blocks
      const mermaidBlocks = messageRef.current.querySelectorAll('.mermaid-diagram');
      mermaidBlocks.forEach(async (block, index) => {
        const code = block.textContent || '';
        if (code.trim()) {
          try {
            const { svg } = await mermaid.render(`mermaid-${Date.now()}-${index}`, code);
            block.innerHTML = svg;
          } catch (error) {
            console.error('Mermaid render error:', error);
            block.textContent = 'Error rendering diagram';
          }
        }
      });
    }
  }, [content, isUser]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Format content with markdown, mermaid, and links
  const formatContent = (text: string) => {
    if (!text) return null;

    const parts = [];
    let currentIndex = 0;

    // Find mermaid blocks
    const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
    let match;

    while ((match = mermaidRegex.exec(text)) !== null) {
      // Add text before mermaid
      if (match.index > currentIndex) {
        parts.push(formatText(text.substring(currentIndex, match.index)));
      }

      // Add mermaid diagram
      parts.push(
        <div key={`mermaid-${match.index}`} className="mermaid-diagram my-4 p-4 bg-[#1a1818] rounded-lg border-2 border-[#8439c5]/30 overflow-x-auto">
          {match[1]}
        </div>
      );

      currentIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (currentIndex < text.length) {
      parts.push(formatText(text.substring(currentIndex)));
    }

    return <div>{parts}</div>;
  };

  // Format text with markdown
  const formatText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // URLs
      if (line.includes('http')) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = line.split(urlRegex);
        return (
          <div key={index} className="my-2">
            {parts.map((part, i) =>
              part.match(urlRegex) ? (
                <a
                  key={i}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#8439c5] hover:text-[#8439c5]/80 underline font-medium"
                >
                  <ExternalLink className="w-3 h-3" />
                  {part}
                </a>
              ) : (
                <span key={i}>{formatInlineMarkdown(part)}</span>
              )
            )}
          </div>
        );
      }

      // Bullet points
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        return (
          <div key={index} className="ml-4 my-1.5 flex gap-2">
            <span className="text-[#8439c5] font-bold">•</span>
            <span>{formatInlineMarkdown(line.trim().substring(1).trim())}</span>
          </div>
        );
      }

      // Headings
      if (line.trim().endsWith(':') && line.trim().startsWith('**')) {
        return (
          <div key={index} className="font-bold text-white mt-3 mb-2 text-base">
            {formatInlineMarkdown(line)}
          </div>
        );
      }

      // Regular text
      return (
        <div key={index} className="my-1">
          {formatInlineMarkdown(line)}
        </div>
      );
    });
  };

  // Format inline markdown (bold, etc.)
  const formatInlineMarkdown = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);

    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-bold text-white">{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
          isUser
            ? "bg-gradient-to-br from-[#8439c5] to-purple-700"
            : "bg-gradient-to-br from-blue-600 to-indigo-600"
        )}
      >
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl",
          isUser
            ? "bg-gradient-to-br from-[#8439c5] to-purple-700 text-white"
            : "bg-[#2b2929] border border-[#8439c5]/30 text-[#e3e3e3]"
        )}
      >
        {/* Show image if present */}
        {image && isUser && (
          <img src={image} alt="Uploaded" className="max-w-full rounded-lg mb-2 max-h-48 object-cover" />
        )}

        {isLoading ? (
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#8439c5] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-[#8439c5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-[#8439c5] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        ) : (
          <div ref={messageRef} className="text-sm leading-relaxed">
            {formatContent(content)}
          </div>
        )}

        {/* Copy button for assistant messages */}
        {!isUser && !isLoading && content && (
          <button
            onClick={copyToClipboard}
            className="mt-2 text-xs text-[#8439c5] hover:text-[#8439c5]/80 flex items-center gap-1"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" /> Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
