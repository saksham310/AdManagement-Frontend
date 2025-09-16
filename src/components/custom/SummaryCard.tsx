import {Card, CardContent, CardTitle} from "@/components/ui/card";

export interface SummaryCardItem {
    label: string;
    value: number | string;
    formatNumber?: boolean; // optional formatting
}

interface SummaryCardsProps {
    items: SummaryCardItem[];
}

const SummaryCard = ({items}: SummaryCardsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
            {items.map(({label, value, formatNumber}) => (
                <Card key={label} className="bg-white shadow-sm p-4">
                    <CardTitle>{label}</CardTitle>
                    <CardContent className="text-2xl font-bold p-4">
                        {formatNumber && typeof value === "number"
                            ? new Intl.NumberFormat().format(value)
                            : value}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCard;
