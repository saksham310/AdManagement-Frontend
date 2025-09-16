import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { ComponentType, SVGProps } from "react";

export interface SummaryCardItem {
    label: string;
    value: number | string;
    icon?: ComponentType<SVGProps<SVGSVGElement>>;
    formatNumber?: boolean;
}

interface SummaryCardsProps {
    items: SummaryCardItem[];
}

const SummaryCard = ({ items }: SummaryCardsProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {items.map(({ label, value, formatNumber, icon: Icon }) => (
                <Card
                    key={label}
                    className="border border-gray-200 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <CardTitle className="text-sm text-gray-500">{label}</CardTitle>
                    <CardContent className="flex items-center justify-between mt-2">
            <span className="text-2xl font-semibold text-green-700">
              {formatNumber && typeof value === "number"
                  ? new Intl.NumberFormat().format(value)
                  : value}
            </span>
                        {Icon && <Icon className="w-6 h-6 text-green-600" />}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SummaryCard;
