import { IoSend, IoStop } from "react-icons/io5";

interface ChatInputProps {
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onStopReply?: () => void;
  isWaitingForReply: boolean;
  placeholder?: string;
  maxWidth?: string;
  isLarge?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSubmit,
  onStopReply,
  isWaitingForReply,
  placeholder = "Ask me anything",
  maxWidth = "max-w-2xl",
  isLarge = false
}) => {
  return (
    <div className={`w-full ${maxWidth}`}>
      <form onSubmit={onSubmit} className="relative flex">
        <input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder={isWaitingForReply ? "Waiting for reply..." : placeholder}
          disabled={isWaitingForReply}
          className={`w-full !border !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-emerald-500 focus:!border-t-emerald-500 focus:ring-emerald-500/20 rounded-lg ${
            isLarge ? 'p-6 text-xl' : 'p-3'
          } pr-14 ${
            isWaitingForReply ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
        <button
          type={isWaitingForReply ? "button" : "submit"}
          onClick={isWaitingForReply ? onStopReply : undefined}
          disabled={!isWaitingForReply && message.trim() === ""}
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-md flex items-center justify-center transition-colors ${
            isLarge ? 'w-12 h-12' : 'w-8 h-8'
          } ${
            isWaitingForReply
              ? "bg-red-500 cursor-pointer hover:bg-red-600"
              : message.trim() === ""
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-800 cursor-pointer"
          }`}
        >
          {isWaitingForReply ? (
            <IoStop className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} text-white`} />
          ) : (
            <IoSend className={`${isLarge ? 'h-6 w-6' : 'h-5 w-5'} text-white`} />
          )}
        </button>
      </form>
    </div>
  );
}; 