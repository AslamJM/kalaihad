import { type LucideIcon } from "lucide-react";
import { type FC } from "react";
import { Card, CardContent } from "~/components/ui/card";

interface LinkCardProps {
  item: {
    name: string;
    icon: LucideIcon;
  };
}

const LinkCard: FC<LinkCardProps> = ({ item }) => {
  const Icon = item.icon;
  return (
    <Card className="hover:bg-slate-50">
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-y-2 py-2">
          <h3 className="text-sm font-semibold md:text-xl">{item.name}</h3>
          <Icon className="h-4 w-4 md:h-8 md:w-8" />
        </div>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
