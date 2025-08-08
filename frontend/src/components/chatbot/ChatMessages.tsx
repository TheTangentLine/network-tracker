import React, { useEffect, useRef } from "react";
import { ChatMessage } from "./ChatMessage";
import type { ChatMessagesProps } from "../../entities/Chat";

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 py-4 px-4">
      <div className="max-w-6xl mx-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            id={message.id}
            text={message.text}
            sender={message.sender}
            timestamp={message.timestamp}
            isStreaming={message.isStreaming}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}; 