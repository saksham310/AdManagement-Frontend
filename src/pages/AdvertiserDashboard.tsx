import DashboardHeader from "@/components/custom/DashboardHeader.tsx";
import AdsTable from "@/components/custom/AdsTable.tsx";

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
                    <AdsTable/>
                </div>
            </main>
        </div>
    </>
}

export default AdvertiserDashboard;