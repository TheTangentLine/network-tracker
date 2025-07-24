import { useState } from "react";
import DetailsEditor from "./DetailsEditor";
import PasswordEditor from "./PasswordEditor";

const HandleEditor: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true);

    const handleClick = () => {
        setShowDetails(prev => !prev);
    }

    return (
        <>
            <div className="flex flex-row mt-10 font-montserrat">
                <button className={`bg-emerald-${showDetails ? '200' : '50'} px-3 py-2 duration-300 rounded-t-xl cursor-pointer`} onClick={handleClick}>Details</button>
                <button className={`bg-emerald-${showDetails ? '50' : '200'} px-3 py-2 duration-300 rounded-t-xl cursor-pointer`} onClick={handleClick}>Password</button>
            </div>
            <div className="flex flex-col font-montserrat bg-emerald-50">
                {showDetails ? <DetailsEditor /> : <PasswordEditor />}
            </div>
        </>
    )
}


export default HandleEditor;
