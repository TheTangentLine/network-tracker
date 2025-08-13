import React from "react";

import type { SpeedTestResult } from "../../entities/Network";
import type { Report } from "../../entities/Report";

import { MdDelete } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa";

interface DataGridsProps {
    data: Report[],
    handleDelete: (id: string) => void,
    handleGeneratePdf: (input: SpeedTestResult) => void,
    handleChatbot: (input: SpeedTestResult) => void
}

const DataGrids: React.FC<DataGridsProps> = ({
    data,
    handleDelete,
    handleGeneratePdf,
    handleChatbot
}) => {
    
    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden w-full mb-10">
        
            {/*---------------------------------- Header ----------------------------------*/}

            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                <h2 className="text-2xl font-montserrat-bold text-white flex items-center gap-3">
                    Test Results
                </h2>
            </div>

            <div className="grid grid-cols-6 gap-0.5 text-center overflow-hidden">
                {["Ping", "Upload", "Download", "Date", "Time", "Action"].map(header => (
                    <div
                        key={header}
                        className="flex items-center justify-center bg-emerald-50 text-emerald-800 text-lg font-montserrat-bold p-4 border-b border-emerald-100"
                    >
                        {header}
                    </div>
                ))}

                {/*------------------------------------- Data -----------------------------------*/}
                {data.map((d, idx) => {
                    const bgColor = idx % 2 === 0 ? "bg-white" : "bg-emerald-50";
                    return (
                        <React.Fragment key={d._id}>
                            <div className={`${bgColor} p-4 border-b border-emerald-100 text-emerald-700 font-montserrat`}>
                                {d.network_data.ping.toFixed(2)} ms
                            </div>
                            <div className={`${bgColor} p-4 border-b border-emerald-100 text-emerald-700 font-montserrat`}>
                                {d.network_data.upload_mbps.toFixed(2)} Mbps
                            </div>
                            <div className={`${bgColor} p-4 border-b border-emerald-100 text-emerald-700 font-montserrat`}>
                                {d.network_data.download_mbps.toFixed(2)} Mbps
                            </div>
                            <div className={`${bgColor} p-4 border-b border-emerald-100 text-emerald-700 font-montserrat`}>
                                {d.date}
                            </div>
                            <div className={`${bgColor} p-4 border-b border-emerald-100 text-emerald-700 font-montserrat`}>
                                {d.time}
                            </div>
                            <div className={`${bgColor} flex justify-center space-x-4 p-4 border-b border-emerald-100`}>
                                <button 
                                    onClick={() => handleDelete(d._id)} 
                                    className="text-2xl text-red-500 hover:text-red-700 transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <MdDelete />
                                </button>
                                <button 
                                    onClick={() => handleChatbot(d.network_data)} 
                                    className="text-2xl text-emerald-600 hover:text-emerald-800 transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <TbMessageChatbotFilled />
                                </button>
                                <button 
                                    onClick={() => handleGeneratePdf(d.network_data)} 
                                    className="text-xl text-emerald-600 hover:text-emerald-800 transition-all duration-300 hover:scale-110 cursor-pointer"
                                >
                                    <FaFilePdf />
                                </button>
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    )
}

export default DataGrids;