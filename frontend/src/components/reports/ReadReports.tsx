import React, { useEffect, useState } from "react";
import { useReadReports } from "../../hooks/reports/useReadReports";
import { generatePageNumbers } from "../../utils/generatePageNumber";
import { MdDelete } from "react-icons/md";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { FaFilePdf, FaSearch } from "react-icons/fa";

import { useFilter } from '../../hooks/reports/useFilter'
import FilterArea from "./FilterArea";
import type { SpeedTestResult } from "../../entities/Network";
import PdfPreviewModal from "./PdfPreviewModal";

const History: React.FC = () => {
    const { page, totalPages, setPage, data, readReports, deleteReports, previewModalOpen,
        pdfBlob,
        setPreviewModalOpen,
        generatePdf,
        handleSavePdf, } = useReadReports();

    const { filter, setFilter } = useFilter();
    const [searchText, setSearchText] = useState<string>("")

    useEffect(() => {
        readReports(filter, searchText);
    }, [page, filter]);

    const handlePageClick = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0 });
    };

    const handleDelete = (id: string) => {
        deleteReports(id);
        readReports(filter, searchText);
    }

    const handleGeneratePdf = (input: SpeedTestResult) => {
        generatePdf(input);
    }

    const handleChatbot = (input: SpeedTestResult) => {
        console.log(input);
    }

    const listOfPages = generatePageNumbers(page, totalPages);

    return (
        <>
            <PdfPreviewModal
                isOpen={previewModalOpen}
                pdfBlob={pdfBlob}
                onClose={() => setPreviewModalOpen(false)}
                onSave={handleSavePdf}
            />
            {/* Search Bar */}
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setPage(1);
                    readReports(filter, searchText);
                }}
                className="flex space-x-2 mb-7"
            >
                <div className="relative flex-1">
                    <input
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        type="text"
                        placeholder="Search for result"
                        className="w-full bg-gray-200 text-xl rounded-xl p-2 pl-10"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600" />
                </div>
                <button
                    type="submit"
                    className="text-xl bg-green-600 rounded-2xl font-montserrat-bold text-white px-5 cursor-pointer hover:bg-green-800 duration-300"
                >
                    Search
                </button>
            </form>



            {/* Filters */}
            <FilterArea
                sortDate={filter.sortDate}
                sortMetric={filter.sortMetric}
                dateStart={filter.dateStart}
                dateEnd={filter.dateEnd}
                onChangeSortDate={(value: 'latest' | 'oldest' | '') => setFilter({ ...filter, sortDate: value })}
                onChangeMetric={(value: 'ping' | 'upload' | 'download' | '') => setFilter({ ...filter, sortMetric: value })}
                onChangeDateStart={(value: string) => setFilter({ ...filter, dateStart: value })}
                onChangeDateEnd={(value: string) => setFilter({ ...filter, dateEnd: value })}
            />



            {/* Data Grid */}

            <div className="flex flex-col items-center w-full h-full">

                {data.length != 0 ?
                    <>
                        <div className="grid grid-cols-6 gap-0.5 text-center bg-white rounded-xl drop-shadow-xl drop-shadow-emerald-400 w-full mb-10 overflow-hidden">
                            {/* Header */}
                            {["Ping", "Upload", "Download", "Date", "Time", "Action"].map(header => (
                                <div
                                    key={header}
                                    className="flex items-center justify-center bg-green-800 text-white text-xl font-montserrat-bold p-2"
                                >
                                    {header}
                                </div>
                            ))}

                            {/* Rows */}
                            {data.map((d, idx) => {
                                const bgColor = idx % 2 === 0 ? "bg-emerald-50" : "bg-emerald-100";
                                return (
                                    <React.Fragment key={d._id}>
                                        <div className={`${bgColor} p-2`}>{d.network_data.ping.toFixed(2)} ms</div>
                                        <div className={`${bgColor} p-2`}>{d.network_data.upload_mbps.toFixed(2)} Mbps</div>
                                        <div className={`${bgColor} p-2`}>{d.network_data.download_mbps.toFixed(2)} Mbps</div>
                                        <div className={`${bgColor} p-2`}>{d.date}</div>
                                        <div className={`${bgColor} p-2`}>{d.time}</div>
                                        <div className={`${bgColor} flex justify-center space-x-5 p-2 text-2xl text-emerald-900`}>
                                            <button onClick={() => handleDelete(d._id)} className="cursor-pointer"><MdDelete /></button>
                                            <button onClick={() => handleChatbot(d.network_data)} className="cursor-pointer"><TbMessageChatbotFilled /></button>
                                            <button onClick={() => handleGeneratePdf(d.network_data)} className="cursor-pointer text-xl"><FaFilePdf /></button>
                                        </div>
                                    </React.Fragment>
                                );
                            })}
                        </div>


                        {/* Pagination */}
                        <div className="flex space-x-3 mt-6">
                            {listOfPages.map((p, idx) =>
                                p !== -1 ? (
                                    <button
                                        key={p}
                                        onClick={() => handlePageClick(p)}
                                        className={`h-10 w-10 rounded-full text-white ${page === p ? "bg-emerald-900" : "bg-emerald-600"
                                            } hover:bg-emerald-900 transition`}
                                    >
                                        {p}
                                    </button>
                                ) : (
                                    <span key={`ellipsis-${idx}`} className="h-10 w-10 flex items-center justify-center text-2xl">
                                        …
                                    </span>
                                )
                            )}
                        </div>
                    </>
                    : <p className="mt-10 text-2xl"> No History stored </p>
                }
            </div>

        </>
    );
};

export default History;
