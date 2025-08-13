import { MarkdownRenderer } from "./MarkdownRenderer";
import type { ChatMessageProps } from "../../entities/Chat";

// Simple markdown formatter for streaming content
const formatStreamingMarkdown = (text: string) => {
  // Handle basic markdown formatting for streaming
  let formatted = text
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-montserrat-bold">$1</strong>')
    .replace(/__(.*?)__/g, '<strong class="font-montserrat-bold">$1</strong>')
    // Italic text
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded text-base font-mono">$1</code>')
    // Line breaks
    .replace(/\n/g, '<br />');
  
  return formatted;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  text, 
  sender, 
  isStreaming = false
}) => {
  const isUser = sender === "user";
  
  return (
    <div
      className={`flex items-start gap-4 mb-4 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-xl relative ${
          isUser
            ? "bg-emerald-500 text-white rounded-br-none ml-auto max-w-[70%] shadow-md"
            : "text-gray-900 w-full max-w-none"
        }`}
      >
        {!isUser ? (
          <div className="text-base">
            {isStreaming ? (
              <div className="inline">
                <span dangerouslySetInnerHTML={{ __html: formatStreamingMarkdown(text) }} />
                <span className="inline-block w-0.5 h-5 bg-emerald-500 ml-1 animate-pulse">
                </span>
              </div>
            ) : (
              <MarkdownRenderer 
                content={text} 
                className="text-base"
              />
            )}
          </div>
        ) : (
          <p className="text-md whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
}; 