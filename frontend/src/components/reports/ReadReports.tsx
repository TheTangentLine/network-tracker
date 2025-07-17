import React, { useEffect } from "react";
import { useReadReports } from "../../hooks/reports/useReadReports";

import { generatePageNumbers } from "../../utils/generatePageNumber";
import { MdDelete } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa";

const History: React.FC = () => {

    const { page, totalPages, setPage, data, readReports } = useReadReports();

    useEffect(() => {
        readReports();
    }, [page]);

    // 2) Buttons only need to update the page
    const handlePageClick = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({
            top: 0
        });
    };

    const listOfPages = generatePageNumbers(page, totalPages);
    return (
        <>
            {/* <form className='flex flex-row space-x-3 mb-10'>
                <input
                    className="bg-gray-200 text-2xl rounded-xl p-2 w-2xl"
                    type='text'
                    placeholder="Search for result"
                />
                <button className="text-xl bg-green-600 rounded-2xl font-montserrat-bold text-white px-5">Search</button>
            </form>
            <div>
                <p>filter</p>
            </div> */}
            <div className="flex flex-col items-center w-full h-full">
                {/* Grid for history: 5 columns (Ping, Upload, Download, Date, Time) */}
                <div className="grid grid-cols-6 gap-0.5 text-center bg-white rounded-xl drop-shadow-xl drop-shadow-emerald-400 w-full mb-10 overflow-hidden">
                    {/* Header Row */}
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Ping</div>
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Upload</div>
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Download</div>
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Date</div>
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Time</div>
                    <div className="flex font-montserrat-bold text-2xl items-center justify-center bg-green-800 text-white p-2">Action</div>

                    {/* Data Rows */}
                    {data.map((d, idx) => (
                        <React.Fragment key={d._id}>
                            <div className={`p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>{d.network_data.ping.toFixed(2)} ms</div>
                            <div className={`p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>{d.network_data.upload_speed.toFixed(2)} Mbps</div>
                            <div className={`p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>{d.network_data.download_speed.toFixed(2)} Mbps</div>
                            <div className={`p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>{d.date}</div>
                            <div className={`p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>{d.time}</div>
                            <div className={`flex flex-row space-x-5 justify-center text-2xl text-emerald-900 p-2 bg-emerald-${idx % 2 == 0 ? 50 : 100}`}>
                                <button className="cursor-pointer"><MdDelete /></button>
                                <button className="cursor-pointer"><TbMessageChatbotFilled /></button>
                                <button className="cursor-pointer text-xl"><FaFilePdf /></button>
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Page Buttons */}
                <div className="flex space-x-3 mt-6">
                    {listOfPages.map((p, idx) =>
                        p !== -1 ? (
                            <button
                                key={p}
                                className={`
                                text-white
                                h-10 w-10 rounded-4xl cursor-pointer
                                ${page === p ? "bg-emerald-900 " : "bg-emerald-600"}
                                hover:bg-emerald-900 transition
                            `}
                                onClick={() => handlePageClick(p)}
                            >
                                {p}
                            </button>
                        ) : (
                            <p
                                key={`ellipsis-${idx}`}
                                className="h-10 w-10 flex items-center justify-center text-2xl"
                            >
                                …
                            </p>
                        )
                    )}
                </div>
            </div>
        </>

    );
}

export default History;