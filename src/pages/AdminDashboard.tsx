import {columns} from "@/pages/AdvertiserDashboard.tsx";
import AdsData from "@/components/custom/AdsData.tsx";
import DashboardHeader from "@/components/custom/DashboardHeader.tsx";
import UserForm, {type UserRecord} from "@/components/custom/UserForm.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Plus, UserPlus} from "lucide-react";
import {useCreateUser} from "@/hooks/useCreateUser.ts";
import DialogForm from "@/components/custom/DialogForm.tsx";
import AdminAdForm, {type AdminAdRecord} from "@/components/custom/AdminAdForm.tsx";
import {useCreateAds} from "@/hooks/useCreateAds.ts";

const adColumns = [
    ...columns,
    {
        key: "group",
        label: "Advertiser",
        sortable: true,
    },

]
const AdminDashboardPage = () => {
    const [openUserForm, setOpenUserForm] = useState(false)
    const [openAdForm, setOpenAdForm] = useState(false)
    const {mutate, isPending} = useCreateUser();
    const {mutate: mutateAd, isPending: isPendingAd} = useCreateAds();

    const handleCreateUser = (values: UserRecord) => {
        mutate(values);
        setOpenUserForm(false)
    }

    const handleCreateAd = (values: AdminAdRecord) => {
        mutateAd(values)
        setOpenAdForm(false)
    }
    return (
        <>
            <div className="min-h-screen bg-background">
                <DashboardHeader/>
                <div className="flex justify-end gap-4 my-4 mr-4 md:mr-24">
                    <Button onClick={() => setOpenUserForm(true)} className="cursor-pointer flex items-center gap-2">
                        <UserPlus className="w-4 h-4"/>
                        Add User
                    </Button>

                    <Button onClick={() => setOpenAdForm(true)} className="cursor-pointer flex items-center gap-2">
                        <Plus className="w-4 h-4"/>
                        Add Advertisement
                    </Button>
                </div>

                <DialogForm open={openUserForm} setOpen={setOpenUserForm} title={"Add new user"}>
                    <UserForm onSubmit={handleCreateUser} isSubmitting={isPending}/>
                </DialogForm>

                <DialogForm open={openAdForm} setOpen={setOpenAdForm} title={"Add new Ad"}>
                    <AdminAdForm onSubmit={handleCreateAd} isSubmitting={isPendingAd}/>
                </DialogForm>
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