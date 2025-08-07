import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const hasSubmittedFromState = useRef<boolean>(false);
  const location = useLocation();

  const submitMessage = (messageText: string) => {
    if (messageText.trim() === "" || isWaitingForReply) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    setMessages((prevArray) => [...prevArray, userMessage]);
    setIsWaitingForReply(true);
    
    // Simulate AI delay
    timeoutRef.current = window.setTimeout(() => {
      const fakeAiResponse: Message = {
        id: messages.length + 2,
        text: "I'm just a placeholder AI, but I'm here to help!",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000),
      };

      setMessages((prevArray) => [...prevArray, fakeAiResponse]);
      setIsWaitingForReply(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || isWaitingForReply) return;
    
    submitMessage(message);
    setMessage("");
  };

  const handleStopReply = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsWaitingForReply(false);
  };

  // Handle network data from location state
  useEffect(() => {
    if (location.state && !hasSubmittedFromState.current) {
      const networkData = location.state;
      const formattedMessage = `Network Performance Analysis Request\n\nPlease analyze the following network metrics:\n\n Ping: ${networkData.ping.toFixed(2)} ms\n  Upload Speed: ${networkData.upload_mbps.toFixed(2)} Mbps\n  Download Speed: ${networkData.download_mbps.toFixed(2)} Mbps\n\nCould you provide insights on:\n• Overall connection quality\n• Performance recommendations\n• Potential improvements`;
      
      hasSubmittedFromState.current = true;
      submitMessage(formattedMessage);
    }
    console.log("Location state:", location.state);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    message,
    setMessage,
    messages,
    isWaitingForReply,
    handleSubmit,
    handleStopReply,
  };
}; 