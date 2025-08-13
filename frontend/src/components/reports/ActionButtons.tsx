// ---- Types ----
import type { SpeedTestResult } from "../../entities/Network";
import type { Report } from "../../entities/Report";

// ---- Icons ----
import { FaFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";

interface ActionButtonsProps {
    bgColor: "bg-white" | "bg-emerald-50",
    handleDelete: (id: string) => void,
    handleChatbot: (input: SpeedTestResult) => void,
    handleGeneratePdf: (input: SpeedTestResult) => void
    data: Report
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    bgColor,
    handleDelete,
    handleChatbot,
    handleGeneratePdf,
    data
}) => {
    return (
        <div className={`${bgColor} flex justify-center space-x-4 p-4 border-b border-emerald-100`}>
            <button 
                onClick={() => handleDelete(data._id)} 
                className="text-2xl text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
                <MdDelete />
            </button>
            <button 
                onClick={() => handleChatbot(data.network_data)} 
                className="text-2xl text-emerald-600 hover:text-emerald-800 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
                <TbMessageChatbotFilled />
            </button>
            <button 
                onClick={() => handleGeneratePdf(data.network_data)} 
                className="text-xl text-emerald-600 hover:text-emerald-800 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
                <FaFilePdf />
            </button>
        </div>
    )
}

export default ActionButtons;