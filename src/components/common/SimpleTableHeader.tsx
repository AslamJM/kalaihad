import { type FC } from "react";
import { TableHead, TableHeader, TableRow } from "../ui/table";

interface SimpleTableHeaderProps {
  heads: string[];
}

const SimpleTableHeader: FC<SimpleTableHeaderProps> = ({ heads }) => {
  return (
    <TableHeader>
      <TableRow>
        {heads.map((head) => (
          <TableHead key={head}>{head}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

export default SimpleTableHeader;
