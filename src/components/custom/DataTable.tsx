import {useEffect, useMemo, useState} from "react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Badge} from "@/components/ui/badge"
import {ArrowUpDown, Filter, Search} from "lucide-react"
import {useGetAds} from "@/hooks/useGetAds.ts";

export interface AdRecord {
    id: number;
    app: string;
    page: string;
    placement: string;
    status: "active" | "inactive";
    impressions: number;
}


const DataTable = () => {
    const [adData, setAdData] = useState<Array<AdRecord | null>>([]);
    const [searchTerm, setSearchTerm] = useState("")
    const [appFilter, setAppFilter] = useState("all")
    const [sortBy, setSortBy] = useState<"impressions" | null>(null)
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
    const {data} = useGetAds();

    useEffect(() => {
        if (data) {
            setAdData(data)
        }
    }, [data])

    // Get unique apps for filter dropdown
    const uniqueApps = useMemo(() => {
        return Array.from(new Set(adData.map((ad) => ad.app)))
    }, [adData])

    // Filter and sort data
    const filteredAndSortedData = useMemo(() => {
        const filtered = adData.filter((ad) => {
            const matchesSearch =
                ad.app.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ad.placement.toLowerCase().includes(searchTerm.toLowerCase())
            const matchesApp = appFilter === "all" || ad.app === appFilter
            return matchesSearch && matchesApp
        })

        if (sortBy === "impressions") {
            filtered.sort((a, b) => {
                return sortOrder === "asc" ? a.impressions - b.impressions : b.impressions - a.impressions
            })
        }

        return filtered
    }, [searchTerm, appFilter, sortBy, sortOrder, adData])

    const handleSort = () => {
        if (sortBy === "impressions") {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy("impressions")
            setSortOrder("desc")
        }
    }

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat().format(num)
    }

    return (
        <Card className="shadow-sm bg-white">
            <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-lg md:text-xl font-semibold">Advertisement Performance</CardTitle>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <Search
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input
                                placeholder="Search ads..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 w-full sm:w-64 bg-white border border-gray-300"
                            />
                        </div>

                        <Select value={appFilter} onValueChange={setAppFilter}>
                            <SelectTrigger className="w-full sm:w-32 bg-white border border-gray-300">
                                <Filter className="h-4 w-4 mr-2"/>
                                <SelectValue placeholder="Filter by App"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Apps</SelectItem>
                                {uniqueApps.map((app) => (
                                    <SelectItem key={app} value={app}>
                                        {app}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">App</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Page</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Placement</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">Status</th>
                            <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSort}
                                    className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground"
                                >
                                    Impressions
                                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                                </Button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredAndSortedData.map((ad) => (
                            <tr key={ad.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                                <td className="py-4 px-4 font-medium text-foreground">{ad.app}</td>
                                <td className="py-4 px-4 text-muted-foreground">{ad.page}</td>
                                <td className="py-4 px-4 text-muted-foreground">{ad.placement}</td>
                                <td className="py-4 px-4">
                                    <Badge
                                        variant={ad.status === "active" ? "default" : "secondary"}
                                        className={
                                            ad.status === "active"
                                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                                : "bg-red-100 text-red-800 hover:bg-red-100"
                                        }
                                    >
                                        <div
                                            className={`w-2 h-2 rounded-full mr-2 ${
                                                ad.status === "active" ? "bg-green-500" : "bg-red-500"
                                            }`}
                                        />
                                        {ad.status}
                                    </Badge>
                                </td>
                                <td className="py-4 px-4 font-mono text-foreground">{formatNumber(ad.impressions)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredAndSortedData.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            No advertisements found matching your criteria.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )

}

export default DataTable;