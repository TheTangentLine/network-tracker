// import { PaperAirplaneIcon } from "heroicons";
import { useState, useRef, useEffect } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IoSend } from "react-icons/io5";
import { IoStop } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: string; timestamp: Date }[]
  >([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const hasSubmittedFromState = useRef<boolean>(false);
  const location = useLocation();

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

  // Function to submit a message programmatically
  const submitMessage = (messageText: string) => {
    if (messageText.trim() === "" || isWaitingForReply) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    setMessages((prevArray) => [...prevArray, userMessage]);
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

  useEffect(() => {
    if (location.state && !hasSubmittedFromState.current) {
      // Create a formatted string from the network data
      const networkData = location.state;
      const formattedMessage = `Network Performance Analysis Request\n\nPlease analyze the following network metrics:\n\n Ping: ${networkData.ping.toFixed(2)} ms\n  Upload Speed: ${networkData.upload_mbps.toFixed(2)} Mbps\n  Download Speed: ${networkData.download_mbps.toFixed(2)} Mbps\n\nCould you provide insights on:\n• Overall connection quality\n• Performance recommendations\n• Potential improvements`;
      
      // Mark as submitted to prevent duplicate
      hasSubmittedFromState.current = true;
      
      // Automatically submit the message
      submitMessage(formattedMessage);
    }
    console.log("Location state:", location.state); // Debug log
  }, []);

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
                className="w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-emerald-500 focus:!border-t-emerald-500 focus:ring-emerald-500/20 rounded-lg p-3 pr-14"
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
            <div className="max-w-6xl mx-auto">
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
                        ? "bg-emerald-500 text-white rounded-br-none ml-auto"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
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
            <div className="max-w-6xl mx-auto">
              <form onSubmit={handleSubmit} className="relative flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isWaitingForReply ? "Waiting for reply..." : "Ask me anything"}
                  disabled={isWaitingForReply}
                  className={`w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-emerald-500 focus:!border-t-emerald-500 focus:ring-green-500/20 rounded-lg p-3 pr-14 ${
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