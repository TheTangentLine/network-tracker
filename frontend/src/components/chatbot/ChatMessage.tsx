import { MarkdownRenderer } from "./MarkdownRenderer";
import { TypingAnimation } from "./TypingAnimation";

interface ChatMessageProps {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  id, 
  text, 
  sender, 
  timestamp,
  isTyping = false
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
          isTyping ? (
            <TypingAnimation 
              content={text} 
              speed={10}
              className="text-base"
            />
          ) : (
            <MarkdownRenderer 
              content={text} 
              className="text-base"
            />
          )
        ) : (
          <p className="text-sm whitespace-pre-wrap">{text}</p>
        )}
      </div>
    </div>
  );
}; 