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
      // Initialize mermaid with error handling
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          logLevel: 'error',
          themeVariables: {
            primaryColor: '#8b5cf6',
            primaryTextColor: '#1f2937',
            primaryBorderColor: '#a78bfa',
            lineColor: '#8b5cf6',
            secondaryColor: '#f3f4f6',
            tertiaryColor: '#ede9fe',
          }
        });

        // Find all mermaid code blocks
        const mermaidBlocks = messageRef.current.querySelectorAll('.mermaid-diagram:not(.rendered)');
        
        mermaidBlocks.forEach(async (block, index) => {
          const code = block.textContent || '';
          if (code.trim()) {
            try {
              // Validate the diagram syntax before rendering
              const trimmedCode = code.trim();
              
              // Check if it's a valid mermaid diagram type
              const validTypes = ['graph', 'flowchart', 'sequenceDiagram', 'classDiagram', 'stateDiagram', 'erDiagram', 'journey', 'gantt', 'pie', 'gitGraph', 'mindmap', 'timeline'];
              const isValidDiagram = validTypes.some(type => trimmedCode.startsWith(type));
              
              if (!isValidDiagram) {
                throw new Error('Invalid diagram type');
              }
              
              const elementId = `mermaid-${Date.now()}-${index}`;
              const { svg } = await mermaid.render(elementId, trimmedCode);
              block.innerHTML = svg;
              block.classList.add('rendered');
            } catch (error) {
              console.error('Mermaid render error:', error);
              // Show code as fallback instead of error message
              block.innerHTML = `
                <div class="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
                  <p class="text-xs text-gray-500 mb-2 font-semibold">Diagram Code:</p>
                  <pre class="text-xs text-gray-700 font-mono whitespace-pre-wrap">${code.trim()}</pre>
                </div>
              `;
              block.classList.add('rendered');
            }
          }
        });
      } catch (error) {
        console.error('Mermaid initialization error:', error);
      }
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
        <div key={`mermaid-${match.index}`} className="mermaid-diagram my-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border-2 border-purple-200 overflow-x-auto shadow-md hover:shadow-lg transition-shadow">
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

  // Format inline content (bold, links, inline code)
  const formatInlineContent = (text: string) => {
    // Handle bold text **text**
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldRegex);

    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-semibold text-gray-900">{part}</strong>;
      }
      
      // Handle inline code `code`
      const codeRegex = /`([^`]+)`/g;
      const codeParts = part.split(codeRegex);
      
      return codeParts.map((codePart, j) => {
        if (j % 2 === 1) {
          return (
            <code key={`${i}-${j}`} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-sm font-mono">
              {codePart}
            </code>
          );
        }
        return <span key={`${i}-${j}`}>{codePart}</span>;
      });
    });
  };

  // Format text with enhanced markdown and line-by-line display
  const formatText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Skip empty lines but preserve spacing
      if (!line.trim()) {
        return <div key={`empty-${index}`} className="h-2"></div>;
      }

      // Main headings (##)
      if (line.startsWith('## ')) {
        return (
          <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-800 mt-6 mb-3 pb-2 border-b-2 border-purple-200 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></span>
            {line.replace('## ', '')}
          </h2>
        );
      }

      // Sub headings (###)
      if (line.startsWith('### ')) {
        return (
          <h3 key={`h3-${index}`} className="text-xl font-semibold text-gray-700 mt-5 mb-2 flex items-center gap-2">
            <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"></span>
            {line.replace('### ', '')}
          </h3>
        );
      }

      // Bullet points with •
      if (line.trim().startsWith('•')) {
        const content = line.trim().substring(1).trim();
        return (
          <div key={`bullet-${index}`} className="flex items-start gap-3 my-2 ml-2 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mt-2 flex-shrink-0 shadow-sm"></span>
            <span className="text-gray-700 leading-relaxed flex-1">{formatInlineContent(content)}</span>
          </div>
        );
      }

      // Numbered lists (1., 2., etc.)
      const numberedMatch = line.match(/^(\d+)\.\s+(.+)/);
      if (numberedMatch) {
        return (
          <div key={`numbered-${index}`} className="flex items-start gap-3 my-2 ml-2 animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
              {numberedMatch[1]}
            </span>
            <span className="text-gray-700 leading-relaxed flex-1">{formatInlineContent(numberedMatch[2])}</span>
          </div>
        );
      }

      // Code blocks
      if (line.trim().startsWith('```')) {
        return <div key={`code-${index}`} className="my-1"></div>;
      }

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
        <strong key={i} className="font-bold text-gray-900">{part}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in-up group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg transition-transform group-hover:scale-110",
          isUser
            ? "bg-gradient-to-br from-purple-500 to-blue-500"
            : "bg-gradient-to-br from-indigo-500 to-purple-500 ring-2 ring-purple-200"
        )}
      >
        {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white animate-pulse" />}
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] px-5 py-4 rounded-2xl shadow-md transition-all group-hover:shadow-lg",
          isUser
            ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-tr-md"
            : "bg-white border-2 border-gray-100 text-gray-800 rounded-tl-md"
        )}
      >
        {/* Show image if present */}
        {image && isUser && (
          <img src={image} alt="Uploaded" className="max-w-full rounded-xl mb-3 max-h-48 object-cover shadow-md border-2 border-white/30" />
        )}

        {isLoading ? (
          <div className="flex items-center gap-2 py-1">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="text-sm text-gray-500 ml-2">Medha AI is typing...</span>
          </div>
        ) : (
          <div ref={messageRef} className={cn(
            "text-[15px] leading-relaxed",
            isUser ? "text-white" : "text-gray-700"
          )}>
            {formatContent(content)}
          </div>
        )}

        {/* Copy button for assistant messages */}
        {!isUser && !isLoading && content && (
          <button
            onClick={copyToClipboard}
            className="mt-4 px-3 py-1.5 text-xs bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 text-purple-600 hover:text-purple-700 flex items-center gap-1.5 font-medium transition-all rounded-lg border border-purple-200 shadow-sm hover:shadow-md"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied to clipboard!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy response
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
