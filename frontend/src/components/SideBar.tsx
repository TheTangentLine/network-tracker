import React from 'react';
import { FiLogOut } from 'react-icons/fi';

import { TbLayoutSidebarFilled } from "react-icons/tb";
import { TbLayoutSidebar } from "react-icons/tb";
import { RxAvatar } from "react-icons/rx";
import useLogout from '../hooks/useLogout';
import useAuth from '../hooks/useAuth';

interface SidebarProps {
    toggleSidebar: () => void;
    isSidebarVisible: boolean;
}

const SideBar: React.FC<SidebarProps> = ({
    toggleSidebar,
    isSidebarVisible,
}) => {
    const { logout, loading: logoutLoading } = useLogout()
    const { user } = useAuth();
    return (
        <div
            className="h-full bg-green-950 shadow-2xl shadow-emerald-700 flex flex-col font-montserrat"
        >
            {/* Toggle Button */}
            <div className={`flex ${isSidebarVisible ? 'justify-end' : 'justify-center'} bg-emerald-950 shadow-xs shadow-amber-100`}>
                <button
                    className="text-white text-5xl p-2 rounded-lg cursor-pointer transition-all"
                    onClick={toggleSidebar}
                >
                    {isSidebarVisible ?
                        <TbLayoutSidebarFilled /> : <TbLayoutSidebar />}
                </button>
            </div>

            {/* Spacer to push content to the bottom */}
            <div className="flex-grow" />

            {/* User Info */}
            <div className="flex flex-row justify-center items-center text-white mb-4">
                <div className='text-5xl'><RxAvatar /></div>
                {isSidebarVisible &&
                    <div className="flex flex-col bg-emerald-950 shadow-md shadow-emerald-900 rounded-2xl ml-2 p-3">
                        <p className='font-montserrat-bold'>{user?.username || 'No name available'}</p>
                        <p>{user?.email || 'No email available'}</p>
                    </div>
                }
            </div>

            {/* Logout Button */}
            <div className='flex justify-center text-white bg-emerald-950 mt-5 p-5 font-montserrat-bold shadow-2xl shadow-amber-100'>
                <button
                    className="cursor-pointer"
                    onClick={logout}
                    disabled={logoutLoading}
                >
                    {logoutLoading ? '...' :
                        <div className='flex flex-row justify-center items-center '>
                            <FiLogOut className="text-4xl cursor-pointer" />
                            {isSidebarVisible && <label className='text-xl ml-3'>Sign out</label>}
                        </div>}
                </button>
            </div>
        </div>
    );
};

export default SideBar;
