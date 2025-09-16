import {columns} from "@/pages/AdvertiserDashboard.tsx";
import AdsData from "@/components/custom/AdsData.tsx";
import DashboardHeader from "@/components/custom/DashboardHeader.tsx";

const adColumns = [
    ...columns,
    {
        key: "group",
        label: "Advertiser",
        sortable: true,
    },

]
const AdminDashboardPage = () => {
    return (
        <>
            <div className="min-h-screen bg-background">
                <DashboardHeader/>
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground text-balance">Advertisement Dashboard</h1>
                            <p className="text-muted-foreground mt-2">Monitor and track your advertisement campaigns</p>
                        </div>
                        <AdsData columns={adColumns} />
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminDashboardPage;