import {Badge} from "@/components/ui/badge";
import {useGetAds} from "@/hooks/useGetAds.ts";
import DataTable from "@/components/custom/DataTable.tsx";
import {useEffect, useMemo, useState} from "react";
import SummaryCard from "@/components/custom/SummaryCard.tsx";
import {BarChart,Tv, CheckCircle} from "lucide-react";

const columns = [
    {
        key: "app",
        label: "App",
        sortable: false,
    },
    {
        key: "page",
        label: "Page",
    },
    {
        key: "placement",
        label: "Placement",
    },
    {
        key: "status",
        label: "Status",
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


const AdsData = () => {
    const {data} = useGetAds();
    const [adData, setAdData] = useState<AdRecord[]>([]);

    useEffect(() => {
        if (data) {
            setAdData(data)
        }
    }, [data, adData]);

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