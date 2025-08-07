import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatViewProps {
  messages: Message[];
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStopReply: () => void;
  isWaitingForReply: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  message,
  onMessageChange,
  onSubmit,
  onStopReply,
  isWaitingForReply
}) => {
  return (
    <div className="flex flex-col w-full h-full">
      <ChatHeader
        title="Network Assistant"
        subtitle="AI-powered network analysis"
        messageCount={messages.length}
        isCompact={true}
      />
      
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>

      <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <ChatInput
            message={message}
            onMessageChange={onMessageChange}
            onSubmit={onSubmit}
            onStopReply={onStopReply}
            isWaitingForReply={isWaitingForReply}
            maxWidth="w-full"
          />
        </div>
      </div>
    </div>
  );
}; 