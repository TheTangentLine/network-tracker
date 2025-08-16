// ---- Hook ----
import { useChat } from "../../hooks/chatbot/useChat";

// ---- Components ----
import { WelcomeView } from "./WelcomeView";
import { ChatView } from "./ChatView";

const ChatBot = () => {
  const {
    message,
    setMessage,
    messages,
    isWaitingForReply,
    handleSubmit,
    handleWelcomeSubmit,
    handleStopReply,
  } = useChat();

  return (
    <>
      {messages.length === 0 ? (
        <WelcomeView
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleWelcomeSubmit}
          isWaitingForReply={isWaitingForReply}
        />
      ) : (
        <ChatView
          messages={messages}
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
          onStopReply={handleStopReply}
          isWaitingForReply={isWaitingForReply}
        />
      )}
    </>
  );
};

export default ChatBot;