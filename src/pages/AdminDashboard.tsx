import {columns} from "@/pages/AdvertiserDashboard.tsx";
import AdsData from "@/components/custom/AdsData.tsx";
import DashboardHeader from "@/components/custom/DashboardHeader.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog"
import UserForm, {type UserRecord} from "@/components/custom/UserForm.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {UserPlus} from "lucide-react";
import {useCreateUser} from "@/hooks/useCreateUser.tsx";

const adColumns = [
    ...columns,
    {
        key: "group",
        label: "Advertiser",
        sortable: true,
    },

]
const AdminDashboardPage = () => {
    const [open, setOpen] = useState(false)
    const {mutate, isPending} = useCreateUser();

    const handleCreateUser = (values: UserRecord) => {
        mutate(values);
        setOpen(false)
    }
    return (
        <>
            <div className="min-h-screen bg-background">
                <DashboardHeader/>
                <div className="flex justify-end my-4 mr-4 md:mr-24">
                    <Button onClick={() => setOpen(true)} className="flex items-center gap-2">
                        <UserPlus className="w-4 h-4"/>
                        Add User
                    </Button>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New User</DialogTitle>
                        </DialogHeader>
                        <UserForm onSubmit={handleCreateUser} mode="create" isSubmitting={isPending}/>
                    </DialogContent>
                </Dialog>
                <main className="container mx-auto px-4 py-8">
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground text-balance">Advertisement Dashboard</h1>
                            <p className="text-muted-foreground mt-2">Monitor and track your advertisement campaigns</p>
                        </div>
                        <AdsData columns={adColumns}/>
                    </div>
                </main>
            </div>
        </>
    )
}

export default AdminDashboardPage;