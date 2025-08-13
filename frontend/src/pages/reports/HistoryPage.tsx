// ---- Hooks ----
import { useSideBar } from "../../hooks/useSideBar";

// ---- Components ----
import SideBar from "../../components/SideBar";
import History from "../../components/reports/History";

const HistoryPage: React.FC = () => {

    // ------------------- State Management ------------------------->

    const { isSidebarVisible, toggleSidebar } = useSideBar(true);

    // =========================== Rendering ===============================>

    return (
        <div className="relative h-screen font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">

            {/**------------------------- Side Bar ------------------------------- **/}

            <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${isSidebarVisible ? "w-64" : "w-22"}`}>
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                />
            </div>

            {/**-------------------------- History area ----------------------------- **/}

            <div className={`flex-1 h-full transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-22"}`}>
                <History />
            </div>

            {/**--------------------------------------------------------------------**/}

        </div>
    );
};

export default HistoryPage;
