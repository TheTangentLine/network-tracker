import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import type { WelcomeViewProps } from "../../entities/Chat";

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  message,
  onMessageChange,
  onSubmit,
  isWaitingForReply
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
  };

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
          onSubmit={handleFormSubmit}
          isWaitingForReply={isWaitingForReply}
          maxWidth="w-full"
          isLarge={true}
        />
      </div>
    </div>
  );
}; 