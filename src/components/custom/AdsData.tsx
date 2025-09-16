import {useGetAds} from "@/hooks/useGetAds.ts";
import DataTable from "@/components/custom/DataTable.tsx";
import {useEffect, useMemo, useState} from "react";
import SummaryCard from "@/components/custom/SummaryCard.tsx";
import {BarChart,Tv, CheckCircle} from "lucide-react";

interface AdsDataProps {
    columns: typeof columns;
}

const AdsData = ({ columns }: AdsDataProps) => {
    const {data} = useGetAds();
    const [adData, setAdData] = useState<AdRecord[]>([]);

    useEffect(() => {
        if (data) setAdData(data);
    }, [data]);

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
            />
        </div>
    </>
}
export default AdsData;