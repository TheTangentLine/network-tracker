import SideBar from '../components/SideBar';
import NetworkTest from '../components/NetWorkTest';
import { useState } from 'react';

const Testing: React.FC = () => {

    // ------------------- State Management ------------------------->

    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    // ---------------------- Handle Sidebar visibility ----------------->

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // =========================== Rendering ===============================>

    return (
        <div className="flex h-screen">

            {/**------------------------- Side Bar ------------------------------- **/}

            <div
                className={`transition-all duration-300 ease-in-out ${isSidebarVisible ? 'w-64' : 'w-22'}`}
            >
                <SideBar
                    toggleSidebar={toggleSidebar}
                    isSidebarVisible={isSidebarVisible}
                />
            </div>

            {/**-------------------------- Testing area ----------------------------- **/}

            <div className="flex-1 p-10">
                <NetworkTest />
            </div>

            {/**--------------------------------------------------------------------**/}

        </div>
    );
};

export default Testing;
