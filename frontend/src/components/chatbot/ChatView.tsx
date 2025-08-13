// ---- Type ----
import type { ChatViewProps } from "../../entities/Chat";

// ---- Components ----
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

export const ChatView: React.FC<ChatViewProps> = ({
  messages,
  message,
  onMessageChange,
  onSubmit,
  onStopReply,
  isWaitingForReply
}) => {

  // ================================= Rendering ================================>

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50">
      
      <ChatHeader
        title="Network Assistant"
        subtitle="Your AI-powered network analysis companion"
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