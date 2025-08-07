import { WelcomeView } from "./WelcomeView";
import { ChatView } from "./ChatView";
import { useChat } from "../../hooks/chatbot/useChat";

const ChatBot = () => {
  const {
    message,
    setMessage,
    messages,
    isWaitingForReply,
    handleSubmit,
    handleStopReply,
  } = useChat();

  return (
    <>
      {messages.length === 0 ? (
        <WelcomeView
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
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