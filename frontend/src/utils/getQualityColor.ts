export const getQualityRating = (value: number, type: 'download' | 'upload' | 'ping') => {
    if (type === 'ping') {
        if (value <= 20) return { text: 'Very Good', color: 'text-green-600' };
        if (value <= 50) return { text: 'Good', color: 'text-emerald-600' };
        if (value <= 100) return { text: 'Medium', color: 'text-yellow-600' };
        return { text: 'Low', color: 'text-red-600' };
    } else if (type === 'download') {
        if (value >= 100) return { text: 'Very Good', color: 'text-green-600' };
        if (value >= 50) return { text: 'Good', color: 'text-emerald-600' };
        if (value >= 25) return { text: 'Medium', color: 'text-yellow-600' };
        return { text: 'Low', color: 'text-red-600' };
    } else { // upload
        if (value >= 50) return { text: 'Very Good', color: 'text-green-600' };
        if (value >= 20) return { text: 'Good', color: 'text-emerald-600' };
        if (value >= 10) return { text: 'Medium', color: 'text-yellow-600' };
        return { text: 'Low', color: 'text-red-600' };
    }
};