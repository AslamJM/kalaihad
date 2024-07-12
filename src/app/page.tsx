import Link from "next/link";
import LinkCard from "./_components/LinkCard";
import {
  Scissors,
  DollarSign,
  PersonStanding,
  Store,
  User,
} from "lucide-react";

const links = [
  {
    name: "Products",
    icon: Scissors,
  },
  {
    name: "Sales",
    icon: DollarSign,
  },
  {
    name: "Customers",
    icon: PersonStanding,
  },
  {
    name: "stores",
    icon: Store,
  },
  {
    name: "Users",
    icon: User,
  },
];

export default async function Home() {
  return (
    <main>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
        {links.map((l) => (
          <Link href={`/${l.name.toLowerCase()}`} key={l.name}>
            <LinkCard item={l} />
          </Link>
        ))}
      </div>
    </main>
  );
}
