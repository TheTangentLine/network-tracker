import { useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import UploadImages from "./UploadImages";

const InformationPanel: React.FC = () => {
    const { user } = useAuth();
    const [light, setLight] = useState(false)
    const [showUpload, setShowUpload] = useState(false);

    if (!user) return <p>Error</p>
    return (
        <>
            {showUpload && <UploadImages onHandleShow={() => setShowUpload(prev => !prev)} />}
            <div className="flex flex-row font-montserrat">

                <div className="flex flex-col justify-center items-center mr-10">
                    <div className="w-40 h-40 bg-emerald-950 rounded-full mb-3">

                    </div>
                    <button className="bg-emerald-100  w-40 text-xl rounded-2xl p-3" onClick={() => setShowUpload(prev => !prev)}>
                        Upload
                    </button>
                </div>

                <div className="flex flex-row justify-between items-center bg-emerald-100 p-5 rounded-4xl w-full h-40">
                    <div className="flex flex-row items-center">
                        <div>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <button onClick={() => setLight(prev => !prev)}>
                        {light ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>

            </div>
        </>
    )
}


export default InformationPanel;