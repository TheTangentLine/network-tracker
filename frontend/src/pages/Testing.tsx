import { FiLogOut } from 'react-icons/fi';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import { useSpeed } from '../hooks/useSpeed';
import type { SpeedTestMode } from '../entities/Network';

const Testing: React.FC = () => {
    const { user } = useAuth();
    const { logout, loading: logoutLoading } = useLogout();
    const { result, loading: speedLoading, error, runDownload } = useSpeed();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center font-montserrat text-4xl">
            {/* User Info */}
            <div className="flex flex-row items-center justify-center mb-8">
                <label className="font-bold mr-5">Your name is:</label>
                <p>{user?.username || 'No user logged in'}</p>
            </div>
            <div className="flex flex-row items-center justify-center mb-8">
                <label className="font-bold mr-5">Your email is:</label>
                <p>{user?.email || 'No email available'}</p>
            </div>

            {/* Speed Test Controls */}
            <div className="flex flex-row items-center justify-center mb-8">
                <button
                    className="w-2xs h-17 bg-emerald-700 text-white font-bold rounded-2xl hover:scale-125 transition-all duration-300 cursor-pointer mr-10"
                    disabled={speedLoading}
                    onClick={() => runDownload('fast' as SpeedTestMode)}
                >
                    Fast
                </button>
                <button
                    className="w-2xs h-17 bg-amber-700 text-white font-bold rounded-2xl hover:scale-125 transition-all duration-300 cursor-pointer ml-10"
                    disabled={speedLoading}
                    onClick={() => runDownload('slow' as SpeedTestMode)}
                >
                    Slow
                </button>
            </div>

            {/* Speed Test Result */}
            <div className="flex flex-row items-center justify-center mb-8
                            w-2xl h-40 rounded-4xl bg-gray-300">
                <label className="font-bold mr-5">Download speed:</label>
                <p>
                    {speedLoading
                        ? 'Testing...'
                        : error
                            ? 'Error'
                            : result
                                ? `${result.mbps.toFixed(2)} Mbps`
                                : 'N/A'}
                </p>
            </div>

            {/* Logout Button */}
            <div className="text-6xl mt-10">
                <button
                    className="hover:scale-125 transition-all duration-300 cursor-pointer"
                    onClick={logout}
                    disabled={logoutLoading}
                >
                    {logoutLoading ? 'Loading...' : <FiLogOut />}
                </button>
            </div>
        </div>
    );
};

export default Testing;
