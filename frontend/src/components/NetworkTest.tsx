import { useSpeed } from "../hooks/useSpeed";

const NetworkTest: React.FC = () => {


    const { result, loading: speedLoading, error, runTest } = useSpeed();

    const handleClick = async () => {
        await runTest();
    };
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center font-montserrat text-4xl">
            {/* Speed Test Result */}
            <div className="grid mb-8 w-2xl h-70 rounded-4xl bg-gray-200 p-5 shadow-emerald-700 shadow-2xl">
                <div className="flex flex-row">
                    <label className="font-bold mr-10">Ping:</label>
                    <p>
                        {speedLoading ? (
                            'Loading...'
                        ) : error ? (
                            error
                        ) : result ? (
                            `${result.ping.toFixed(2)} ms`
                        ) : (
                            ''
                        )}
                    </p>
                </div>
                <div className="flex flex-row">
                    <label className="font-bold mr-10">Download speed:</label>
                    <p>
                        {speedLoading ? (
                            'Loading...'
                        ) : error ? (
                            error
                        ) : result ? (
                            `${result.download_mbps.toFixed(2)} Mbps`
                        ) : (
                            ''
                        )}
                    </p>
                </div>
                <div className="flex flex-row">
                    <label className="font-bold mr-10">Upload speed:</label>
                    <p>
                        {speedLoading ? (
                            'Loading...'
                        ) : error ? (
                            error
                        ) : result ? (
                            `${result.upload_mbps.toFixed(2)} Mbps`
                        ) : (
                            ''
                        )}
                    </p>
                </div>
            </div>

            {/* Speed Test Controls */}
            <div className="flex flex-row items-center justify-center mb-8">
                <button
                    className="w-2xs h-17 bg-emerald-700 text-white font-bold rounded-2xl hover:scale-125 transition-all duration-300 cursor-pointer"
                    disabled={speedLoading}
                    onClick={handleClick}
                >
                    Test
                </button>
            </div>

        </div>
    )
};

export default NetworkTest;