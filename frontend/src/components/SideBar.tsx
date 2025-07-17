// ---- Hooks ----
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../hooks/auth/useLogout';
import useAuth from '../hooks/auth/useAuth';

// ---- Icons ----
import { FiLogOut } from 'react-icons/fi';
import { FaHistory, FaRobot } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { SiSpeedtest } from "react-icons/si";
import { TbLayoutSidebarFilled } from "react-icons/tb";
import { TbLayoutSidebar } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";

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
    const { user } = useAuth();

    // --------------------------- Router management ------------------------>

    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname;

    // ================================= Rendering =================================>

    return (
        <div className="h-full bg-green-950 shadow-2xl shadow-emerald-700 flex flex-col font-montserrat">

            {/*------------------------------ Hide / Show side bar button ---------------------------------*/}

            <div className={`flex ${isSidebarVisible ? 'justify-end' : 'justify-center'} bg-emerald-950
                            drop-shadow-emerald-900 drop-shadow-xl`}>
                <button
                    className="text-white text-5xl p-2 rounded-lg cursor-pointer transition-all"
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ?
                        <TbLayoutSidebarFilled /> : <TbLayoutSidebar />}
                </button>
            </div>

            {/*----------------------------------- Choosing options --------------------------------------*/}

            <div className='flex flex-col justify-center font-montserrat-bold text-white'>


                {/*----------------------------------- Chatbot ------------------------------------*/}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''}  items-center w-full cursor-pointer p-4 
                                ${currentPath === '/chatbot' ? 'bg-emerald-600 shadow-2xl shadow-emerald-600' : ''}
                                hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-600 duration-300
                                cursor-pointer`}
                    onClick={() => navigate('/chatbot')}
                >
                    <div className="flex justify-center items-center text-4xl">
                        <FaRobot />
                    </div>
                    {isSidebarVisible && <p className="text-xl ml-3 col-span-2">Chatbot</p>}
                </button>


                {/*----------------------------------- Speed test ------------------------------------*/}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''}  items-center w-full cursor-pointer p-4 
                                ${currentPath === '/testing' ? 'bg-emerald-700 shadow-2xl shadow-emerald-700' : ''}
                                hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-700 duration-300
                                cursor-pointer`}
                    onClick={() => navigate('/testing')}
                >
                    <div className="flex justify-center items-center text-4xl">
                        <SiSpeedtest />
                    </div>
                    {isSidebarVisible && <p className="text-xl ml-3 col-span-2">Speed test</p>}
                </button>

                {/*------------------------------------ History -------------------------------------- */}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''}  items-center w-full cursor-pointer p-4 
                                ${currentPath === '/history' ? 'bg-emerald-800 shadow-2xl shadow-emerald-800' : ''}
                                hover:bg-emerald-800 hover:shadow-2xl hover:shadow-emerald-800 duration-300
                                cursor-pointer`}
                    onClick={() => navigate('/history')}
                >

                    <div className="flex justify-center items-center text-4xl">
                        <FaHistory />
                    </div>

                    {isSidebarVisible && <p className="text-xl ml-3 col-span-2">History</p>}
                </button>

                {/*------------------------------------ Settings -------------------------------------- */}

                <button
                    className={`grid ${isSidebarVisible ? 'grid-cols-3' : ''}  items-center w-full cursor-pointer p-4 
                                ${currentPath === '/settings' ? 'bg-emerald-900 shadow-2xl shadow-emerald-900' : ''}
                                hover:bg-emerald-900 hover:shadow-2xl hover:shadow-emerald-900 duration-300
                                cursor-pointer`}
                    onClick={() => navigate('/settings')}
                >

                    <div className="flex justify-center items-center text-4xl">
                        <IoIosSettings />
                    </div>

                    {isSidebarVisible && <p className="text-xl ml-3 col-span-2">Settings</p>}
                </button>
            </div>

            {/*--------------------------- Spacer to push content to the bottom -------------------------*/}

            <div className="flex-grow" />

            {/*-------------------------------------- User Info -------------------------------------*/}

            <div className="flex flex-row justify-center items-center text-white bg-emerald-900 p-5">
                <div className='text-5xl'><RxAvatar /></div>
                {isSidebarVisible &&
                    <div className="flex flex-col bg-emerald-950 shadow-md shadow-emerald-900 rounded-2xl ml-2 p-3">
                        <p className='font-montserrat-bold'>{user?.username || 'No name available'}</p>
                        <p>{user?.email || 'No email available'}</p>
                    </div>
                }
            </div>

            {/*------------------------------------ Logout Button ----------------------------------*/}

            <button className='flex justify-center text-white bg-emerald-950 p-5 font-montserrat-bold drop-shadow-2xl drop-shadow-amber-100
                            hover:bg-emerald-600 duration-300 cursor-pointer'
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
                            <FiLogOut className="text-4xl cursor-pointer" />
                            {isSidebarVisible && <p className='text-xl ml-3'>Sign out</p>}
                        </>
                    )}
                </div>
            </button>

            {/*---------------------------------------------------------------------------------------*/}

        </div>
    );
};

export default SideBar;
