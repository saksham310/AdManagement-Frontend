export interface Column<T> {
    key: keyof T
    label: string
    sortable?: boolean
    render?: (row: T) => React.ReactNode
}

type FilterConfig<T> = {
    key: keyof T
    label: string
    options: string[]
}


export interface DataTableProps<T> {
    data: T[]
    columns: Column<T>[]
    searchKeys?: (keyof T)[]
    filters?: FilterConfig<T>[]
    emptyMessage?: string
    label?: string
}
