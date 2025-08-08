import { MarkdownRenderer } from "./MarkdownRenderer";
import type { ChatMessageProps } from "../../entities/Chat";

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
            <MarkdownRenderer 
              content={text} 
              className="text-base"
            />
            {isStreaming && (
              <span className="inline-block w-0.5 h-5 bg-emerald-500 ml-0.5 animate-pulse">
                &nbsp;
              </span>
            )}
          </div>
        ) : (
          <p className="text-md whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
}; 