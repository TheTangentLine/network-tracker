// ---- Hooks ----
import { useSideBar } from '../../hooks/useSideBar';

// ---- Components ----
import SideBar from '../../components/SideBar';
import NetworkTest from '../../components/network/NetworkTest';

const TestingPage: React.FC = () => {

    // ------------------- State Management ------------------------->

    const { isSidebarVisible, toggleSidebar } = useSideBar();

    // =========================== Rendering ===============================>

    return (
        <div className="relative h-screen">

            {/**------------------------- Side Bar ------------------------------- **/}

            <div className={`transition-all duration-300 ease-in-out  fixed top-0 left-0 h-full ${isSidebarVisible ? 'w-64' : 'w-22'}`}>
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                />
            </div>

            {/**-------------------------- Testing area ----------------------------- **/}

            <div className={`flex-1 px-10 ${isSidebarVisible ? 'ml-64' : 'ml-22'} duration-300`}>
                <NetworkTest />
            </div>

            {/**--------------------------------------------------------------------**/}

        </div>
    );
};

export default TestingPage;
