// ---- Hooks ----
import { useSideBar } from "../../hooks/useSideBar";

// ---- Components ----
import SideBar from "../../components/SideBar";
import History from "../../components/reports/ReadReports";

const HistoryPage: React.FC = () => {

    // ------------------- State Management ------------------------->

    const { isSidebarVisible, toggleSidebar } = useSideBar(true);

    // =========================== Rendering ===============================>

    return (
        <div className="relative h-screen font-montserrat">

            {/**------------------------- Side Bar ------------------------------- **/}

            <div className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out ${isSidebarVisible ? "w-64" : "w-22"}`}>
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                />
            </div>

            {/**-------------------------- History area ----------------------------- **/}

            <div className={`flex-1 px-10 transition-all duration-300 ${isSidebarVisible ? "ml-64" : "ml-22"} h-full`}>
                <History />
            </div>

            {/**--------------------------------------------------------------------**/}

        </div>
    );
};

export default HistoryPage;
