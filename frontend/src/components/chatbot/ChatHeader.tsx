import type { ChatHeaderProps } from "../../entities/Chat";

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  title, 
  subtitle, 
  messageCount, 
  isCompact = false 
}) => {
  if (isCompact) {
    return (
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-emerald-800">{title}</h1>
              <p className="text-sm text-gray-600">{subtitle}</p>
            </div>
            {messageCount !== undefined && (
              <div className="text-sm text-gray-500">
                {messageCount} message{messageCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-2">{title}</h1>
        <p className="text-gray-600 text-lg">{subtitle}</p>
      </div>
    </div>
  );
}; 