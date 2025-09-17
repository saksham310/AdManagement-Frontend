import {useGetAds} from "@/hooks/useGetAds.ts";
import DataTable from "@/components/custom/DataTable.tsx";
import {useEffect, useMemo, useState} from "react";
import SummaryCard, {type SummaryCardItem} from "@/components/custom/SummaryCard.tsx";
import {BarChart, CheckCircle, Tv} from "lucide-react";
import type {AdRecord} from "@/interfaces/ad.interface.ts";
import type {columns} from "@/pages/AdvertiserDashboard.tsx";
import AdminAdForm, {type AdminAdRecord} from "@/components/custom/AdminAdForm.tsx";
import DialogForm from "@/components/custom/DialogForm.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type {AuthUser} from "@/interfaces/user.interface.ts";
import {useUpdateAds} from "@/hooks/useUpdateAds.ts";

interface AdsDataProps {
    columns: typeof columns;
}

const AdsData = ({columns}: AdsDataProps) => {
    const {data} = useGetAds();
    const [adData, setAdData] = useState<AdRecord[]>([]);
    const [selectedAd, setSelectedAd] = useState<AdRecord | null>(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const user = useAuthUser<AuthUser>();
    const isAdmin = user?.role === "admin";
    const {mutate} = useUpdateAds(selectedAd?.id || "");

    useEffect(() => {
        if (data) setAdData(data);
    }, [data]);


    const handleEdit = (ad: AdRecord) => {
        setSelectedAd(ad);
        setOpenEditModal(true);
    };

    const onSubmit = (ad: AdminAdRecord) => {
        mutate(ad);
        setOpenEditModal(false);
    }

    const filters = [
        {
            key: "app",
            label: "App",
            options: Array.from(new Set(adData.map(ad => ad.app))),
        },
    ];

    const summaryItems: SummaryCardItem[] = useMemo(() => [
        {label: "Total Ads", value: adData.length, icon: BarChart},
        {
            label: "Total Impressions",
            value: adData.reduce((acc, ad) => acc + ad.impressionCount, 0),
            formatNumber: true,
            icon: Tv
        },
        {label: "Active Ads", value: adData.filter(ad => ad.status === "active").length, icon: CheckCircle},
    ], [adData]);

    return <>
        <div className="space-y-4">
            <SummaryCard items={summaryItems}/>
            <DataTable
                label="Advertisement Progress"
                data={adData}
                columns={columns}
                searchKeys={["app", "page", "placement"]}
                filters={filters}
                emptyMessage="You haven't placed any ads with us."
                onRowDoubleClick={isAdmin ? handleEdit : undefined}
            />
            <DialogForm open={openEditModal} setOpen={setOpenEditModal} title="Edit Advertisement">
                {selectedAd && (
                    <AdminAdForm
                        mode="edit"
                        initialData={selectedAd}
                        onSubmit={(values) => {
                            onSubmit(values);
                        }}
                    />
                )}
            </DialogForm>
        </div>
    </>
}
export default AdsData;