import SideBar from "../../components/SideBar";
import { useSideBar } from "../../hooks/useSideBar";
import ChatBot from "../../components/chatbot/ChatBot";

const ChatBotPage: React.FC = () => {
  // ------------------- State Management ------------------------->

  const { isSidebarVisible, toggleSidebar } = useSideBar();

  // =========================== Rendering ===============================>

  return (
    <div className="relative h-screen flex font-montserrat">
      {/**------------------------- Side Bar ------------------------------- **/}

      <div
        className={`transition-all duration-300 ease-in-out h-full ${
          isSidebarVisible ? "w-64" : "w-22"
        }`}
      >
        <SideBar
          toggleSidebar={toggleSidebar}
          isSidebarVisible={isSidebarVisible}
        />
      </div>

      {/**-------------------------- Chat area ----------------------------- **/}

      <div
        className={`flex-1 h-full ${
          isSidebarVisible ? "ml-0" : "ml-0"
        } duration-300`}
      >
        <ChatBot />
      </div>

      {/**--------------------------------------------------------------------**/}
    </div>
  );
};

export default ChatBotPage;
