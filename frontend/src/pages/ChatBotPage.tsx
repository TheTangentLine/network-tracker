import { useSideBar } from "../hooks/useSideBar";
import { useState } from 'react';

import SideBar from "../components/SideBar";
import ChatBot from "../components/chatbot/ChatBot";
import Reassure from "../components/Reassure";
import useLogout from "../hooks/auth/useLogout";

const ChatBotPage: React.FC = () => {

  // ------------------- State Management ------------------------->

  const { isSidebarVisible, toggleSidebar } = useSideBar();
  const { logout, loading: logoutLoading } = useLogout();
  const [showReassure, setShowReassure] = useState(false);

  // ---------------------------------------------------------------------->

  const handleLogoutClick = () => {
      setShowReassure(true);
  };

  const handleConfirmLogout = async () => {
      setShowReassure(false);
      await logout();
  };

  const handleCancelLogout = () => {
      setShowReassure(false);
  };

  // =========================== Rendering ===============================>

  return (
    <div className="relative min-h-screen font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
    
      {/**------------------------- Side Bar ------------------------------- **/}

      <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${isSidebarVisible ? "w-64" : "w-22"}`}>
        <SideBar
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
            onLogoutClick={handleLogoutClick}
            logoutLoading={logoutLoading}
        />
      </div>

      {/**-------------------------- Chat area ----------------------------- **/}

      <div className={`flex-1 h-full transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-22"}`}>
        <ChatBot />
      </div>

      {/**--------------------------------------------------------------------**/}

      {/* Reassure modal at page level */}
      <Reassure
          isOpen={showReassure}
          title="Log out"
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          confirmText="Continue"
          cancelText="Cancel"
      />

    </div>
  );
};

export default ChatBotPage;
