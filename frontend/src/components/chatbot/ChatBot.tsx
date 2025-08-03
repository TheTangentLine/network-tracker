// import { PaperAirplaneIcon } from "heroicons";
import { useState } from "react";
import { WelcomeScreen } from "./WelcomeScreen";
import { IoSend } from "react-icons/io5";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: string; timestamp: Date }[]
  >([]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (message.trim() === "") return;
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    setMessages((prevArray) => [...prevArray, userMessage]);
    setMessage("");
    // Simulate AI delay
    setTimeout(() => {
      const fakeAiResponse = {
        id: messages.length + 2,
        text: "I'm just a placeholder AI, but I'm here to help!",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000),
      };

      setMessages((prevArray) => [...prevArray, fakeAiResponse]);
    }, 1500);
  };
  return (
    <div className="flex flex-col w-full items-center justify-center font-montserrat min-h-[600px]">
      <div className="flex flex-col w-full max-w-4xl px-4">
        {/**------------------------- Main Chat Area ------------------------------- **/}
        <div className="flex-grow w-full max-w-4xl px-4 space-y-4">
          {messages.length === 0 ? (
            <WelcomeScreen />
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-4 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] px-3 py-2 rounded-xl relative shadow-md ${
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
            ))
          )}
        </div>

        {/**------------------------- Input Box ------------------------------- **/}
        <div className="bg-white sticky bottom-0 z-10 pb-6 pt-4 px-4 rounded-2xl border-0">
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
    </div>
  );
};

export default ChatBot;
