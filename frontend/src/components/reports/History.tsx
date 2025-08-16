// ---- Hooks ----
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFilter } from '../../hooks/reports/useFilter'
import { useReadReports } from "../../hooks/reports/useReadReports";

// ---- Type ----
import type { SpeedTestResult } from "../../entities/Network";

// ---- Components ----
import PdfPreviewModal from "./PdfPreviewModal";
import SearchBar from "./SearchBar";
import FilterArea from "./FilterArea";
import DataGrids from "./DataGrids";
import Paging from "./Paging";
import Notify from "../Notify";


const History: React.FC = () => {

    // ---------------------------------- State management ------------------------------------->

    const { 
        page, 
        totalPages, 
        setPage, 

        data, 
        readReports, 
        
        deleteReports, 
        generatePdf,
        
        handleSavePdf,
        previewModalOpen,
        pdfBlob,
        setPreviewModalOpen,

    } = useReadReports();
    const { filter, setFilter } = useFilter();
    const [searchText, setSearchText] = useState<string>("")
    const [showDeleteSuccess, setShowDeleteSuccess] = useState<boolean>(false);

    const navigate = useNavigate();

    // --------------------------------- Trigger reading reports ---------------------------->

    useEffect(() => {
        readReports(filter, searchText);
    }, [page, filter]);

    // -------------------------------- Search function ----------------------------->

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
    }
    
    // ------------------------------ Delete function ------------------------------->
    
    const handleDelete = async (id: string) => {
        try {
            await deleteReports(id);
            setShowDeleteSuccess(true);
            readReports(filter, searchText);
        } catch (error) {
            // Error handling is already done in the useReadReports hook
            console.error('Delete failed:', error);
        }
    }
    
    // ------------------------------ PDF Generator function ------------------------------>
    
    const handleGeneratePdf = (input: SpeedTestResult) => {
        generatePdf(input);
    }
    
    // ------------------------------ Chatbot function ------------------------------->
    
    const handleChatbot = (input: SpeedTestResult) => {
        navigate('/chatbot', {state: input});
    }

    // ------------------------------ Page navigation ------------------------------->
    
    const handlePageClick = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0 });
    };

    // ------------------------------ Notification handlers ------------------------------->
    
    const handleCloseDeleteSuccess = () => {
        setShowDeleteSuccess(false);
    };

    // =============================== Rendering ==============================>

    return (
        <>
            <PdfPreviewModal
                isOpen={previewModalOpen}
                pdfBlob={pdfBlob}
                onClose={() => setPreviewModalOpen(false)}
                onSave={handleSavePdf}
            />
            
            <Notify
                isOpen={showDeleteSuccess}
                message="Report deleted successfully!"
                onClose={handleCloseDeleteSuccess}
                isSuccess={true}
                title="Success"
            />
            
            {/*------------------------------------ Header ----------------------------------------*/}

            <div className="border-b bg-white border-gray-200 px-6 py-6 w-full">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-green-700 mb-1">Test History</h1>
                    <p className="text-gray-600">View and manage your network speed test results</p>
                </div>
            </div>

            {/*----------------------------------- Main Content -----------------------------------*/}

            <div className="max-w-6xl mx-auto w-full px-6 py-8">

                {/*-------------------------------- Search Bar --------------------------------*/}

                <SearchBar 
                    searchText={searchText} 
                    setSearchText={setSearchText} 
                    onSubmit={e => handleSubmit(e)}
                />

                {/*-------------------------------------- Filters ---------------------------------------*/}

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

                {/*------------------------------------------ Main content ------------------------------------------*/}

                <div className="flex flex-col items-center w-full h-full">
                    {data.length != 0 ?
                        <>
                            <DataGrids 
                                data={data} 
                                handleChatbot={handleChatbot} 
                                handleDelete={handleDelete} 
                                handleGeneratePdf={handleGeneratePdf}
                            />
                            <Paging 
                                page={page} 
                                totalPages={totalPages} 
                                handlePageClick={handlePageClick}
                            />
                        </>
                        : 
                        <p className="mt-10 text-2xl"> No History stored </p>
                    }
                </div>
                
            </div>

            {/*-------------------------------------------------------------------------------------------------*/}
        </>
    );
};

export default History;
