import { useState } from 'react';
import type { Filter } from '../../entities/Filter';

export const useFilter = () => {
    const [filter, setFilter] = useState<Filter>({
        sortDate: '',
        sortMetric: '',
        dateStart: '',
        dateEnd: '',
    });

    return { filter, setFilter };
};
