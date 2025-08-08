import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { chatbotService } from "../../services/chatbotService";
import type { ChatMessage } from "../../entities/Chat";

export const useChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isWaitingForReply, setIsWaitingForReply] = useState(false);
  const hasSubmittedFromState = useRef<boolean>(false);
  const location = useLocation();
  const wsRef = useRef<WebSocket | null>(null);
  const isConnectingRef = useRef<boolean>(false);
  const currentAiMessageId = useRef<number | null>(null);

  const submitMessage = async (messageText: string) => {
    if (messageText.trim() === "" || isWaitingForReply || isConnectingRef.current) return;
    
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(Date.now() - 3600000),
    };
    const newArray = [...messages, userMessage]
    setMessages(newArray);
    setIsWaitingForReply(true);
    isConnectingRef.current = true;
    
    // Create AI message placeholder
    const aiMessageId = messages.length + 2;
    currentAiMessageId.current = aiMessageId;
    
    const aiMessage: ChatMessage = {
      id: aiMessageId,
      text: "",
      sender: "ai",
      timestamp: new Date(Date.now() - 3600000),
      isStreaming: true,
    };
    
    setMessages((prevArray) => [...prevArray, aiMessage]);
    
    try {
      // Close any existing connection
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      
      // Get previous messages for context (include current user message)
      const allMessages = [...messages, userMessage];
      const previousMessages = allMessages.map(msg => {
        if (msg.sender === 'user') {
          return `User Question: ${msg.text}`;
        } else {
          return `AI Response: ${msg.text}`;
        }
      }).filter(text => text.trim() !== '');
      
      // Debug logging
      console.log('Previous messages being sent to backend:', previousMessages);
      console.log('Current message:', messageText);
      
      // Create WebSocket connection for streaming
      wsRef.current = chatbotService.createWebSocketConnection(
        messageText,
        previousMessages,
        // onContent callback
        (content: string) => {
          setMessages((prevArray) => 
            prevArray.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, text: msg.text + content }
                : msg
            )
          );
        },
        // onComplete callback
        () => {
          setMessages((prevArray) => 
            prevArray.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
          setIsWaitingForReply(false);
          isConnectingRef.current = false;
          wsRef.current = null;
          currentAiMessageId.current = null;
        },
        // onError callback
        (error: string) => {
          setMessages((prevArray) => 
            prevArray.map(msg => 
              msg.id === aiMessageId 
                ? { 
                    ...msg, 
                    text: msg.text + `\n\n[Connection interrupted: ${error}]`, 
                    isStreaming: false 
                  }
                : msg
            )
          );
          setIsWaitingForReply(false);
          isConnectingRef.current = false;
          wsRef.current = null;
          currentAiMessageId.current = null;
        }
      );
      
    } catch (error) {
      // Fallback to error message if WebSocket fails
      setMessages((prevArray) => 
        prevArray.map(msg => 
          msg.id === aiMessageId 
            ? { 
                ...msg, 
                text: "Sorry, I'm having trouble connecting to the server. Please try again later.", 
                isStreaming: false 
              }
            : msg
        )
      );
      setIsWaitingForReply(false);
      isConnectingRef.current = false;
      currentAiMessageId.current = null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "" || isWaitingForReply) return;
    
    submitMessage(message);
    setMessage("");
  };

  const handleWelcomeSubmit = (messageText: string) => {
    if (messageText.trim() === "" || isWaitingForReply) return;
    
    submitMessage(messageText);
    setMessage("");
  };

  const handleStopReply = () => {
    if (wsRef.current) {
      wsRef.current.close(1000, 'User stopped');
      wsRef.current = null;
    }
    setIsWaitingForReply(false);
    isConnectingRef.current = false;
    
    // Mark current streaming message as complete
    if (currentAiMessageId.current) {
      setMessages((prevArray) => 
        prevArray.map(msg => 
          msg.id === currentAiMessageId.current 
            ? { ...msg, isStreaming: false }
            : msg
        )
      );
      currentAiMessageId.current = null;
    }
  };

  // Handle network data from location state
  useEffect(() => {
    if (location.state && !hasSubmittedFromState.current) {
      const networkData = location.state;
      const formattedMessage = `Network Performance Analysis Request\n\nPlease analyze the following network metrics:\n\n Ping: ${networkData.ping.toFixed(2)} ms\n  Upload Speed: ${networkData.upload_mbps.toFixed(2)} Mbps\n  Download Speed: ${networkData.download_mbps.toFixed(2)} Mbps\n\nCould you provide insights on:\n• Overall connection quality\n• Performance recommendations\n• Potential improvements`;
      
      hasSubmittedFromState.current = true;
      // Use setTimeout to ensure component is fully mounted
      setTimeout(() => {
        submitMessage(formattedMessage);
      }, 100);
    }
  }, []);

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close(1000, 'Component unmounted');
        wsRef.current = null;
      }
      isConnectingRef.current = false;
      currentAiMessageId.current = null;
    };
  }, []);

  return {
    message,
    setMessage,
    messages,
    isWaitingForReply,
    handleSubmit,
    handleWelcomeSubmit,
    handleStopReply,
  };
}; 