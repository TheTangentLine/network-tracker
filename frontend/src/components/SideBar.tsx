// ---- Hooks ----
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/auth/useLogout';

// ---- Icons ----
import { FiLogOut } from 'react-icons/fi';
import { FaHistory, FaRobot } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { SiSpeedtest } from "react-icons/si";
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";

// ------------------------------ Props ---------------------------->

interface SidebarProps {
    toggleSidebar: () => void;
    isSidebarVisible: boolean;
}

// ------------------------------ Main component ---------------------------->

const SideBar: React.FC<SidebarProps> = ({
    toggleSidebar,
    isSidebarVisible,
}) => {

    // --------------------------- State management ------------------------->

    const { logout, loading: logoutLoading } = useLogout()

    // --------------------------- Router management ------------------------>

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // ================================= Rendering =================================>

    return (
        <div className="h-full bg-gradient-to-b from-emerald-950 to-emerald-900 shadow-2xl shadow-emerald-700/50 flex flex-col font-montserrat">

            {/*------------------------------ Hide / Show side bar button ---------------------------------*/}

            <div className={`flex ${isSidebarVisible ? 'justify-end' : 'justify-center'} bg-emerald-950/80
                            backdrop-blur-sm border-b border-emerald-800/50 my-1`}>
                <button
                    className="text-white text-4xl p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-emerald-800/50 hover:scale-105"
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ?
                        <TbLayoutSidebarFilled /> : <TbLayoutSidebar />}
                </button>
            </div>

            {/*----------------------------------- Choosing options --------------------------------------*/}

            <div className='flex flex-col justify-center font-montserrat-bold text-white p-2'>


                {/*----------------------------------- Chatbot ------------------------------------*/}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''} items-center w-full cursor-pointer p-4 mr-1 my-1 rounded-xl
                                ${currentPath === '/chatbot' ? 'bg-emerald-600/90 shadow-lg shadow-emerald-600/50' : 'hover:bg-emerald-800/50'}
                                transition-all duration-300 hover:scale-105`}
                    onClick={() => navigate('/chatbot')}
                >
                    <div className="flex justify-center items-center text-3xl">
                        <FaRobot />
                    </div>
                    {isSidebarVisible && <p className="text-lg col-span-2 font-montserrat-bold">Chatbot</p>}
                </button>


                {/*----------------------------------- Speed test ------------------------------------*/}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''} items-center w-full cursor-pointer p-4 mr-1 my-1 rounded-xl
                                ${currentPath === '/testing' ? 'bg-emerald-700/90 shadow-lg shadow-emerald-700/50' : 'hover:bg-emerald-800/50'}
                                transition-all duration-300 hover:scale-105`}
                    onClick={() => navigate('/testing')}
                >
                    <div className="flex justify-center items-center text-3xl">
                        <SiSpeedtest />
                    </div>
                    {isSidebarVisible && <p className="text-lg col-span-2 font-montserrat-bold">Speed test</p>}
                </button>

                {/*------------------------------------ History -------------------------------------- */}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''} items-center w-full cursor-pointer p-4 mr-1 my-1 rounded-xl
                                ${currentPath === '/history' ? 'bg-emerald-800/90 shadow-lg shadow-emerald-800/50' : 'hover:bg-emerald-800/50'}
                                transition-all duration-300 hover:scale-105`}
                    onClick={() => navigate('/history')}
                >

                    <div className="flex justify-center items-center text-3xl">
                        <FaHistory />
                    </div>

                    {isSidebarVisible && <p className="text-lg col-span-2 font-montserrat-bold">History</p>}
                </button>

                {/*------------------------------------ Settings -------------------------------------- */}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''} items-center w-full cursor-pointer p-4 mr-1 my-1 rounded-xl
                                ${currentPath === '/settings' ? 'bg-emerald-900/90 shadow-lg shadow-emerald-900/50' : 'hover:bg-emerald-800/50'}
                                transition-all duration-300 hover:scale-105`}
                    onClick={() => navigate('/settings')}
                >

                    <div className="flex justify-center items-center text-3xl">
                        <IoIosSettings />
                    </div>

                    {isSidebarVisible && <p className="text-lg col-span-2 font-montserrat-bold">Settings</p>}
                </button>
            </div>

            {/*--------------------------- Spacer to push content to the bottom -------------------------*/}

            <div className="flex-grow" />

            {/*------------------------------------ Logout Button ----------------------------------*/}

            <button className='flex justify-center text-white bg-emerald-950/80 backdrop-blur-sm p-4 m-2 rounded-xl font-montserrat-bold
                            hover:bg-emerald-600/80 hover:scale-105 transition-all duration-300 cursor-pointer border border-emerald-800/50'
                onClick={logout}
                disabled={logoutLoading}
            >
                <div
                    className='flex flex-row justify-center items-center'
                >
                    {logoutLoading ? (
                        '...'
                    ) : (
                        <>
                            <FiLogOut className="text-3xl cursor-pointer" />
                            {isSidebarVisible && <p className='text-lg font-montserrat-bold'>Sign out</p>}
                        </>
                    )}
                </div>
            </button>

            {/*---------------------------------------------------------------------------------------*/}

        </div>
    );
};

export default SideBar;
