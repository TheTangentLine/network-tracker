import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import type { ChatViewProps } from "../../entities/Chat";

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