import { IconNode } from "lucide-react";
import { type FC } from "react";
import { Card, CardContent } from "~/components/ui/card";

interface LinkCardProps {
  link: string;
  //   icon: IconNode;
}

const LinkCard: FC<LinkCardProps> = ({ link }) => {
  return (
    <Card>
      <CardContent>{link}</CardContent>
    </Card>
  );
};

export default LinkCard;
