import DashboardHeader from "@/components/custom/DashboardHeader.tsx";
import DataTable from "@/components/custom/DataTable.tsx";

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
                    <DataTable/>
                </div>
            </main>
        </div>
    </>
}

export default AdvertiserDashboard;