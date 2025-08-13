import { useSideBar } from "../hooks/useSideBar";

import SideBar from "../components/SideBar";
import ChatBot from "../components/chatbot/ChatBot";

const ChatBotPage: React.FC = () => {

  // ------------------- State Management ------------------------->

  const { isSidebarVisible, toggleSidebar } = useSideBar();

  // =========================== Rendering ===============================>

  return (
    <div className="relative min-h-screen font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
    
      {/**------------------------- Side Bar ------------------------------- **/}

      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${isSidebarVisible ? "w-64" : "w-22"}`}>
        <SideBar
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
        />
      </div>

      {/**-------------------------- Chat area ----------------------------- **/}

      <div className={`flex-1 h-full transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-22"}`}>
        <ChatBot />
      </div>

      {/**--------------------------------------------------------------------**/}
    </div>
  );
};

export default ChatBotPage;
