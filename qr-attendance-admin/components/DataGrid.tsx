import React, { useState, useMemo } from 'react';

interface DataGridProps {
    data: any[];
    columns: any[];
    height?: string;
    className?: string;
    showSearch?: boolean;
    pageSize?: number;
}

const DataGrid: React.FC<DataGridProps> = ({
                                               data,
                                               columns,
                                               height = "400px",
                                               className = "",
                                               showSearch = true,
                                               pageSize = 10
                                           }) => {
    const [sortField, setSortField] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [filterText, setFilterText] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Filter and sort data
    const processedData = useMemo(() => {
        let filtered = data;

        // Apply filter
        if (filterText) {
            filtered = data.filter(row =>
                columns.some(col =>
                    String(row[col.field] || '').toLowerCase().includes(filterText.toLowerCase())
                )
            );
        }

        // Apply sorting
        if (sortField) {
            filtered = [...filtered].sort((a, b) => {
                const aVal = a[sortField];
                const bVal = b[sortField];

                if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return filtered;
    }, [data, filterText, sortField, sortDirection, columns]);

    // Pagination
    const totalPages = Math.ceil(processedData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedData = processedData.slice(startIndex, startIndex + pageSize);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const renderCell = (row: any, column: any) => {
        const value = row[column.field];

        if (column.cellRenderer) {
            return column.cellRenderer({ value, row });
        }

        return <span>{value}</span>;
    };

    return (
        <div className={`w-full ${className}`} style={{ height }}>
            {/* Conditional Filter */}
            {showSearch && (
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    />
                </div>
            )}

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                    <tr className="bg-[#900C27]">
                        {columns.map((column) => (
                            <th
                                key={column.field}
                                className=" text-white px-4 py-3 text-left cursor-pointer hover:bg-[#650B1D] select-none"
                                style={{ width: column.width }}
                                onClick={() => handleSort(column.field)}
                            >
                                <div className="flex items-center">
                                    {column.headerName}
                                    {sortField === column.field && (
                                        <span className="ml-2">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={row.id || index} className="border-b border-gray-700 hover:bg-[#D5EEFF]">
                            {columns.map((column) => (
                                <td key={column.field} className="px-2 py-1 text-sm">
                                    {renderCell(row, column)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-400">
                        Showing {startIndex + 1} to {Math.min(startIndex + pageSize, processedData.length)} of {processedData.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            First
                        </button>
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            Previous
                        </button>
                        <span className="px-3 py-1 bg-red-600 text-white rounded">
              {currentPage}
            </span>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            Next
                        </button>
                        <button
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600"
                        >
                            Last
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataGrid;
