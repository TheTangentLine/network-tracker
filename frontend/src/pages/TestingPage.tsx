// ---- Hooks ----
import { useSideBar } from '../hooks/useSideBar';
import { useState } from 'react';

// ---- Components ----
import SideBar from '../components/SideBar';
import NetworkTest from '../components/network';
import Reassure from '../components/Reassure';
import useLogout from '../hooks/auth/useLogout';

const TestingPage: React.FC = () => {

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
        <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 font-montserrat">

            {/**------------------------- Side Bar ------------------------------- **/}

            <div className={`transition-all duration-300 ease-in-out  fixed top-0 left-0 h-full ${isSidebarVisible ? 'w-64' : 'w-22'}`}>
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                    onLogoutClick={handleLogoutClick}
                    logoutLoading={logoutLoading}
                />
            </div>

            {/**-------------------------- Testing area ----------------------------- **/}

            <div className={`flex-1 h-full transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-22'}`}>
                <NetworkTest />
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

export default TestingPage;
