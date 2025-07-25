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
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-lg flex justify-center items-center duration-300 font-bold">
            <div className="bg-white text-black rounded-xl shadow-2xl w-xl h-64 p-4 flex flex-col items-center">
                <h2 className="text-xl mb-4">PDF Preview</h2>
                <iframe
                    src={url}
                    width="100%"
                    height="300px"
                    title="PDF Preview"
                />
                <div className="mt-4 space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-black px-6 py-2 rounded-xl hover:bg-gray-400"
                    >
                        Continue
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700"
                    >
                        Save PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PdfPreviewModal;
