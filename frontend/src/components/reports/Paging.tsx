import { generatePageNumbers } from "../../utils/generatePageNumber";

interface PagingProps {
    page: number,
    totalPages: number,
    handlePageClick: (newPage: number) => void
}

const Paging: React.FC<PagingProps> = ({
    page,
    totalPages,
    handlePageClick
}) => {

    const listOfPages = generatePageNumbers(page, totalPages);

    return (
        <div className="flex justify-center space-x-3 mt-8">
            {listOfPages.map((p, idx) =>
                p !== -1 ? (
                    <button
                        key={p}
                        onClick={() => handlePageClick(p)}
                        className={`h-12 w-12 rounded-xl text-white font-montserrat-bold transition-all duration-300 ${
                            page === p 
                                ? "bg-emerald-600 shadow-lg shadow-emerald-600/30" 
                                : "bg-white text-emerald-700 border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
                        } hover:scale-105`}
                    >
                        {p}
                    </button>
                ) : (
                    <span key={`ellipsis-${idx}`} className="h-12 w-12 flex items-center justify-center text-2xl text-emerald-600">
                        …
                    </span>
                )
            )}
        </div>
    )
}

export default Paging;