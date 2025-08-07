import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { chatbotService } from "../../services/chatbotService";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isTyping?: boolean;
}

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const hasSubmittedFromState = useRef<boolean>(false);
  const location = useLocation();

  const submitMessage = async (messageText: string) => {
    if (messageText.trim() === "" || isWaitingForReply) return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    setMessages((prevArray) => [...prevArray, userMessage]);
    setIsWaitingForReply(true);
    
    try {
      // Create a placeholder AI message that will be typed
      const aiMessageId = messages.length + 2;
      const placeholderMessage: Message = {
        id: aiMessageId,
        text: "",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000),
        isTyping: true,
      };
      
      setMessages((prevArray) => [...prevArray, placeholderMessage]);
      
      // Get real AI response from backend
      const aiResponse = await chatbotService.askQuestion(messageText);
      
      // Update the message with the real response and start typing
      setMessages((prevArray) => 
        prevArray.map(msg => 
          msg.id === aiMessageId 
            ? { ...msg, text: aiResponse, isTyping: true }
            : msg
        )
      );
      
      // After typing animation completes, remove the typing state
      setTimeout(() => {
        setMessages((prevArray) => 
          prevArray.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, isTyping: false }
              : msg
          )
        );
      }, aiResponse.length * 10 + 300); // Calculate typing duration + buffer
      
    } catch (error) {
      // Fallback to error message if API fails
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
        sender: "ai",
        timestamp: new Date(Date.now() - 3600000),
        isTyping: true,
      };

      setMessages((prevArray) => [...prevArray, errorMessage]);
      
      // Remove typing state after error message
      setTimeout(() => {
        setMessages((prevArray) => 
          prevArray.map(msg => 
            msg.id === errorMessage.id 
              ? { ...msg, isTyping: false }
              : msg
          )
        );
      }, errorMessage.text.length * 10 + 300);
    } finally {
      setIsWaitingForReply(false);
    }
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