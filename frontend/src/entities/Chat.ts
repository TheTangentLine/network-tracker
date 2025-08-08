export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface ChatMessageProps {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
}

export interface WelcomeViewProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (messageText: string) => void;
  isWaitingForReply: boolean;
}

export interface ChatViewProps {
  messages: ChatMessage[];
  message: string;
  onMessageChange: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStopReply: () => void;
  isWaitingForReply: boolean;
}

export interface ChatInputProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStopReply?: () => void;
  isWaitingForReply: boolean;
  placeholder?: string;
  maxWidth?: string;
  isLarge?: boolean;
}

export interface ChatMessagesProps {
  messages: ChatMessage[];
}

export interface ChatHeaderProps {
  title: string;
  subtitle: string;
  messageCount?: number;
  isCompact?: boolean;
}

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}
