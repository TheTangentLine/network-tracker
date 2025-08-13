// ---- Type ----
import type { WelcomeViewProps } from "../../entities/Chat";

// ---- Components ----
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";

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
    <div className="flex flex-col items-center justify-center h-screen px-4 font-montserrat space-y-10">
      <ChatHeader
        title="Network Assistant"
        subtitle="Your AI-powered network analysis companion"
      />

      <div className="w-full max-w-3xl mt-8">
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
