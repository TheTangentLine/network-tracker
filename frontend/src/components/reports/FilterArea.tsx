import { FaFilter } from "react-icons/fa";

import type { Filter } from "../../entities/Filter";

const FilterArea: React.FC<Filter> = ({
    sortDate,
    sortMetric,
    dateStart,
    dateEnd,
    onChangeSortDate,
    onChangeMetric,
    onChangeDateStart,
    onChangeDateEnd,
}) => {
    return (
        <div className="flex items-center justify-between mb-7">
            <div className="flex space-x-4">
                <div className="relative">
                    <select
                        value={sortDate}
                        onChange={(e) => {
                            if (onChangeSortDate) {
                                onChangeSortDate(e.target.value as 'latest' | 'oldest' | '');
                            }
                        }}
                        className="text-xl rounded-xl bg-gray-200 p-2 pl-8"
                    >
                        <option value=""></option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                    <FaFilter className="absolute top-3.5 left-3" />
                </div>

                <div className="relative">
                    <select
                        value={sortMetric}
                        onChange={e => {
                            if (onChangeMetric) {
                                onChangeMetric(e.target.value as 'ping' | 'upload' | 'download' | '');
                            }
                        }}
                        className="text-xl rounded-xl bg-gray-200 p-2 pl-8"
                    >
                        <option value=""></option>
                        <option value="ping">Ping</option>
                        <option value="upload">Upload</option>
                        <option value="download">Download</option>
                    </select>
                    <FaFilter className="absolute top-3.5 left-3" />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative w-full">
                    <input
                        type="date"
                        value={dateStart}
                        onChange={e => {
                            if (onChangeDateStart) {
                                onChangeDateStart(e.target.value);
                            }
                        }}
                        className="text-xl rounded-xl bg-gray-200 p-2 pl-8"
                    />
                    <FaFilter className="absolute top-3.5 left-2" />
                </div>
                <span className="text-xl">to</span>
                <div className="relative">
                    <input
                        type="date"
                        value={dateEnd}
                        onChange={e => {
                            if (onChangeDateEnd) {
                                onChangeDateEnd(e.target.value);
                            }
                        }}
                        className="text-xl rounded-xl bg-gray-200 p-2 pl-8"
                    />
                    <FaFilter className="absolute left-2 top-3.5" />
                </div>
            </div>
        </div>
    );
};

export default FilterArea;
