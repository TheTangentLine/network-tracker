import { MarkdownRenderer } from "./MarkdownRenderer";

interface ChatMessageProps {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  id, 
  text, 
  sender, 
  timestamp,
  isStreaming = false
}) => {
  return (
    <div
      className={`flex items-start gap-4 mb-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-xl relative ${
          sender === "user"
            ? "bg-emerald-500 text-white rounded-br-none ml-auto max-w-[70%] shadow-md"
            : "text-gray-900 w-full max-w-none"
        }`}
      >
        {sender === "ai" ? (
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
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
}; 