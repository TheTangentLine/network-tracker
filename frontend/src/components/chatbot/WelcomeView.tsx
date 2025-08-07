import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

interface WelcomeViewProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isWaitingForReply: boolean;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  message,
  onMessageChange,
  onSubmit,
  isWaitingForReply
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 font-montserrat space-y-10">
      <ChatHeader
        title="Network Assistant"
        subtitle="Your AI-powered network analysis companion"
      />
      
      <div className="w-full max-w-4xl mt-8">
        <ChatInput
          message={message}
          onMessageChange={onMessageChange}
          onSubmit={onSubmit}
          isWaitingForReply={isWaitingForReply}
          maxWidth="w-full"
        />
      </div>
    </div>
  );
}; 