import { useSideBar } from "../../hooks/useSideBar";

import SideBar from "../../components/SideBar";
import Settings from "../../components/auth/settings/Settings";

const SettingsPage: React.FC = () => {
    // ------------------- State Management ------------------------->

    const { isSidebarVisible, toggleSidebar } = useSideBar();

    // =========================== Rendering ===============================>

    return (
        <div className="relative h-screen flex font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
            {/**------------------------- Side Bar ------------------------------- **/}

            <div className={`transition-all duration-300 ease-in-out fixed top-0 left-0 h-full z-50 ${isSidebarVisible ? "w-64" : "w-22"}`}>
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                />
            </div>

            {/**-------------------------- Settings area ----------------------------- **/}

            <div className={`flex-1 h-full transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-22"}`}>
                <Settings />
            </div>

            {/**--------------------------------------------------------------------**/}
        </div>
    )
}

export default SettingsPage;