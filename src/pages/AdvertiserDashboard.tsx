import DashboardHeader from "@/components/custom/DashboardHeader.tsx";
import AdsData from "@/components/custom/AdsData.tsx";
import {Badge} from "@/components/ui/badge.tsx";


export const columns = [
    {
        key: "app",
        label: "App",
        sortable: true,
    },
    {
        key: "page",
        label: "Page",
        sortable: true,
    },
    {
        key: "placement",
        label: "Placement",
    },
    {
        key: "status",
        label: "Status",
        sortable: true,
        render: (row: AdRecord) => (
            <Badge
                variant={row.status === "active" ? "default" : "secondary"}
                className={`flex items-center gap-1 ${
                    row.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
            >
                <span className={`w-2 h-2 rounded-full ${row.status === "active" ? "bg-green-600" : "bg-red-600"}`}/>
                {row.status}
            </Badge>

        ),
    },
    {
        key: "impressionCount",
        label: "Impressions",
        sortable: true,
        render: (row: AdRecord) => new Intl.NumberFormat().format(row.impressionCount),
    },
];


const AdvertiserDashboard = () => {


    return <>
        <div className="min-h-screen bg-background">
            <DashboardHeader/>
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground text-balance">Advertisement Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Monitor and track your advertisement campaigns</p>
                    </div>
                    <AdsData columns={columns} />
                </div>
            </main>
        </div>
    </>
}

export default AdvertiserDashboard;