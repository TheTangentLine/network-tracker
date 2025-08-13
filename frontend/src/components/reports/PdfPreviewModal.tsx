import React from "react";

interface PdfPreviewModalProps {
    isOpen: boolean;
    pdfBlob: Blob | null;
    onClose: () => void;
    onSave: () => void;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
    isOpen,
    pdfBlob,
    onClose,
    onSave,
}) => {
    if (!isOpen || !pdfBlob) return null;

    const url = window.URL.createObjectURL(pdfBlob);

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-md flex justify-center items-center duration-300 font-montserrat">
            <div className="flex flex-col justify-between items-center bg-white text-gray-800 rounded-2xl shadow-2xl w-140 h-96 p-8 mx-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">PDF Preview</h2>
                </div>
                
                <div className="flex-1 w-full mb-6">
                    <iframe
                        src={url}
                        width="100%"
                        height="100%"
                        title="PDF Preview"
                        className="rounded-xl border border-gray-200"
                    />
                </div>
                
                <div className="flex space-x-4">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105 text-lg bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                    >
                        Continue
                    </button>
                    <button
                        onClick={onSave}
                        className="cursor-pointer px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                        Save PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PdfPreviewModal;
