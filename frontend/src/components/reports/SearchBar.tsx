import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
    searchText: string,
    setSearchText: (value: React.SetStateAction<string>) => void,
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined,
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchText,
    setSearchText,
    onSubmit
}) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex space-x-4 mb-8"
        >
            <div className="relative flex-1">
                <input
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    type="text"
                    placeholder="Search for result"
                    className="w-full bg-white border-2 border-emerald-200 text-emerald-700 text-lg rounded-xl p-4 pl-12 font-montserrat focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all duration-300"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 text-xl" />
            </div>
            <button
                type="submit"
                className="px-8 py-4 bg-emerald-600 text-white font-montserrat-bold rounded-xl transition-all duration-300 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:scale-105"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar;
