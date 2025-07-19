export interface Filter {
    sortDate: 'latest' | 'oldest' | ''
    sortMetric: 'ping' | 'upload' | 'download' | ''
    dateStart: string
    dateEnd: string
    onChangeSortDate?: (value: 'latest' | 'oldest' | '') => void
    onChangeMetric?: (value: 'ping' | 'upload' | 'download' | '') => void
    onChangeDateStart?: (value: string) => void
    onChangeDateEnd?: (value: string) => void
}