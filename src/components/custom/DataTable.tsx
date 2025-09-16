import {useMemo, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {ArrowUpDown, Filter, Search} from "lucide-react"

import type {DataTableProps} from "@/interfaces/table.interface.ts";

function DataTable<T extends Record<string, any>>
({
     data,
     columns,
     searchKeys = [],
     filters = [],
     emptyMessage,
     label
 }: DataTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [activeFilters, setActiveFilters] = useState<Record<string, string>>({})

    const processedData = useMemo(() => {
        let filteredData = [...data];

        if (searchTerm && searchTerm.length > 3) {
            filteredData = filteredData.filter((item) =>
                searchKeys.some((key) => String(item[key]).toLowerCase().includes(searchTerm.toLowerCase())));
        }

        Object.entries(activeFilters).forEach(([key, value]) => {
            if (value !== "all") {
                filteredData = filteredData.filter((row) => String(row[key]) === value)
            }
        });

        if (sortKey) {
            filteredData.sort((a, b) => {
                const valA = a[sortKey]
                const valB = b[sortKey]
                if (valA < valB) return sortOrder === "asc" ? -1 : 1
                if (valA > valB) return sortOrder === "asc" ? 1 : -1
                return 0
            })
        }

        return filteredData;
    }, [data, searchTerm, activeFilters, sortKey, sortOrder, searchKeys])

    return (
        <Card className="shadow-sm bg-white">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle
                        className="text-lg md:text-xl text-green-900 font-semibold">{label}
                    </CardTitle>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search..." value={searchTerm}
                                   onChange={(e) => setSearchTerm(e.target.value)}
                                   className="pl-10 w-full sm:w-64 bg-white border border-gray-300"/>
                        </div>
                        {filters.map(({key, label, options}) => (
                            <Select key={String(key)} value={activeFilters[key as string] ?? "all"}
                                    onValueChange={(val) => setActiveFilters((prev) => ({...prev, [key]: val}))}>
                                <SelectTrigger
                                    className="w-full sm:w-32 bg-white border border-gray-300">
                                    <Filter className="h-4 w-4 mr-2"/>
                                    <SelectValue placeholder={`Filter by ${label}`}/> </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value="all">All {label}
                                    </SelectItem>
                                    {options.map((opt) => (
                                        <SelectItem key={opt} value={opt}> {opt} </SelectItem>))}
                                </SelectContent>
                            </Select>))}
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    {processedData.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground"> {emptyMessage}
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-border"> {columns.map(({key, label, sortable}) => (
                                <th key={String(key)}
                                    className="text-left py-3 px-4 font-medium text-primary"> {sortable ? (
                                    <Button variant="ghost" size="sm" onClick={() => {
                                        if (sortKey === key) {
                                            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                                        } else {
                                            setSortKey(key)
                                            setSortOrder("asc")
                                        }
                                    }}
                                            className="h-auto p-0 font-medium text-primary hover:bg-transparent hover:text-primary"> {label}
                                        <ArrowUpDown className="ml-2 h-4 w-4"/> </Button>) : (label)} </th>))} </tr>
                            </thead>
                            <tbody>
                            {processedData.map((row, idx) => (
                                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"} >
                                    {columns.map(({ key, render }) => (
                                        <td key={String(key)} className="py-3 px-4 text-gray-700">
                                            {render ? render(row) : String(row[key])}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>)}
                </div>
            </CardContent>
        </Card>)

}


export default DataTable;