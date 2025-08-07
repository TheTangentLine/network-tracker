interface ChatMessageProps {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ 
  id, 
  text, 
  sender, 
  timestamp 
}) => {
  return (
    <div
      className={`flex items-start gap-4 mb-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-xl relative shadow-md ${
          sender === "user"
            ? "bg-emerald-500 text-white rounded-br-none ml-auto"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{text}</p>
        <p className="mt-1 text-xs opacity-60 text-right">
          {timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}; 