// import { PaperAirplaneIcon } from "heroicons";
import { useState, useRef } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IoSend } from "react-icons/io5";
import { IoStop } from "react-icons/io5";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: string; timestamp: Date }[]
  >([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim() === "" || isWaitingForReply) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    setMessages((prevArray) => [...prevArray, userMessage]);
    setMessage("");
    setIsWaitingForReply(true);
    
    // Simulate AI delay
    timeoutRef.current = window.setTimeout(() => {
      const fakeAiResponse = {
        id: messages.length + 2,
        text: "I'm just a placeholder AI, but I'm here to help!",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000),
      };

      setMessages((prevArray) => [...prevArray, fakeAiResponse]);
      setIsWaitingForReply(false);
    }, 1500);
  };

  const handleStopReply = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsWaitingForReply(false);
  };

  return (
    <>
      {messages.length === 0 ? (
        // Welcome screen layout - more centered vertically
        <div className="flex flex-col items-center justify-center h-full px-4 font-montserrat">
          <div className="flex flex-col items-center justify-center">
            <WelcomeScreen />
          </div>
          
          <div className="w-full max-w-2xl mt-20">
            <form onSubmit={handleSubmit} className="relative flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask me anything"
                className="w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20 rounded-lg p-3 pr-14"
              />
              <button
                type="submit"
                disabled={message.trim() === ""}
                className={`w-8 h-8 absolute right-2 top-1/2 -translate-y-1/2 rounded-md flex items-center justify-center transition-colors
                ${
                  message.trim() === ""
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-gray-800 cursor-pointer"
                }`}
              >
                <IoSend className="h-5 w-5 text-white" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Chat layout - scrollbar at the very right edge
        <div className="flex flex-col w-full h-full overflow-y-auto">
          {/* Messages area with centered content */}
          <div className="flex-1 space-y-4 py-4 px-4">
            <div className="max-w-4xl mx-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-4 mb-4 ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-xl relative shadow-md ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-none ml-auto"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="mt-1 text-xs opacity-60 text-right">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input area at very bottom */}
          <div className="bg-white border-t border-gray-200 px-4 py-4 flex-shrink-0">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit} className="relative flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isWaitingForReply ? "Waiting for reply..." : "Ask me anything"}
                  disabled={isWaitingForReply}
                  className={`w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-blue-500 focus:!border-t-blue-500 focus:ring-blue-500/20 rounded-lg p-3 pr-14 ${
                    isWaitingForReply ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
                <button
                  type={isWaitingForReply ? "button" : "submit"}
                  onClick={isWaitingForReply ? handleStopReply : undefined}
                  disabled={!isWaitingForReply && message.trim() === ""}
                  className={`w-8 h-8 absolute right-2 top-1/2 -translate-y-1/2 rounded-md flex items-center justify-center transition-colors
                  ${
                    isWaitingForReply
                      ? "bg-red-500 cursor-pointer hover:bg-red-600"
                      : message.trim() === ""
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gray-800 cursor-pointer"
                  }`}
                >
                  {isWaitingForReply ? (
                    <IoStop className="h-5 w-5 text-white" />
                  ) : (
                    <IoSend className="h-5 w-5 text-white" />
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
