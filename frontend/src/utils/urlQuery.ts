import type { Filter } from "../entities/Filter";

export function generateUrlQuery(username: string | undefined, page: number, filter: Filter | undefined, searchText: string) {
    let baseString: string = `/reports/read?username=${username}&page=${page}`

    // Utility function to validate date format (YYYY-MM-DD)
    const isValidDate = (date: string) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    }

    // Ensure dateStart is valid
    if (filter?.sortDate !== '') {
        baseString += `&sortDate=${filter?.sortDate}`
    }

    if (filter?.sortMetric !== '') {
        baseString += `&sortMetric=${filter?.sortMetric}`
    }

    if (filter?.dateStart && isValidDate(filter?.dateStart)) {
        baseString += `&dateStart=${filter?.dateStart}`;
    } else if (filter?.dateStart) {
        return baseString;
    }

    if (filter?.dateEnd && isValidDate(filter?.dateEnd)) {
        baseString += `&dateEnd=${filter?.dateEnd}`;
    } else if (filter?.dateEnd) {
        return baseString;
    }

    if (searchText !== '')
        baseString += `&searchText=${searchText}`

    return baseString;
}