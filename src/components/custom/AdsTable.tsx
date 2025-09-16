import {Badge} from "@/components/ui/badge";
import {useGetAds} from "@/hooks/useGetAds.ts";
import DataTable from "@/components/custom/DataTable.tsx";

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
                className={
                    row.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                }
            >
                <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                        row.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                />
                {row.status}
            </Badge>
        ),
    },
    {
        key: "impressions",
        label: "Impressions",
        sortable: true,
        render: (row: AdRecord) => new Intl.NumberFormat().format(row.impressions),
    },
];


const AdsTable = () => {
    const {data} = useGetAds();
    const adData = data?.ads || [];

    const filters = [
        {
            key: "app",
            label: "App",
            options: Array.from(new Set(adData.map(ad => ad.app))),
        },
    ];

    return <>
        <DataTable
            label={'Advertisement Progress'}
            data={adData}
            columns={columns}
            searchKeys={["app", "page", "placement"]}
            filters={filters}
            emptyMessage="You haven't placed any ads with us."
        />
    </>
}

export default AdsTable;