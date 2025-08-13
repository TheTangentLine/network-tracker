// ---- Hooks ----
import React from "react";

// ---- Type ----
import type { SpeedTestResult } from "../../entities/Network";
import type { Report } from "../../entities/Report";

// ---- Components ----
import ActionButtons from "./ActionButtons";

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

            <div className="grid grid-cols-6 gap-0.5 text-center overflow-hidden">
                
                {/*---------------------------------- Header ----------------------------------*/}
                
                {["Ping", "Upload", "Download", "Date", "Time", "Action"].map(header => (
                    <div
                        key={header}
                        className="flex items-center justify-center bg-emerald-700 text-white text-lg font-montserrat-bold p-4 border-b border-emerald-100"
                    >
                        {header}
                    </div>
                ))}

                {/*--------------------------------- Data -----------------------------------*/}
                
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

                            <ActionButtons 
                                bgColor={bgColor} 
                                handleChatbot={handleChatbot} 
                                handleDelete={handleDelete} 
                                handleGeneratePdf={handleGeneratePdf} 
                                data={d}
                            />

                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    )
}

export default DataGrids;