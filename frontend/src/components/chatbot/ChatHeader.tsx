// ---- Type ----
import type { ChatHeaderProps } from "../../entities/Chat";

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title, 
  subtitle, 
  messageCount, 
  isCompact = false 
}) => {
  if (isCompact) {
    return (
      <div className="bg-white border-b border-gray-200 px-6 py-6 w-full">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-emerald-700 mb-1">Network Assistant</h1>
            <p className="text-gray-600">AI-powered network analysis and support</p>
          </div>
          <div className="text-lg text-gray-500">
          {messageCount} message{messageCount !== 1 ? 's' : ''}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-emerald-800 mb-5">{title}</h1>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </div>
    </div>
  );
}; 