export const generatePageNumbers = (
    currentPage: number,
    totalPages: number
): number[] => {
    // -------------------------- Less than 5 pages ----------------------------->

    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // ------------------------- More than or equal to 6 pages ------------------->

    // At the beginning
    if (currentPage <= 2) {
        return [1, 2, 3, 4, -1, totalPages];
    }

    // At the end
    if (currentPage >= totalPages - 1) {
        return [1, -1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    // Normal cases
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
};
