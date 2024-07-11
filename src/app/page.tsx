import Link from "next/link";
import LinkCard from "./_components/LinkCard";

const links = ["Products", "Sales", "Customers", "Stores", "Users"];

export default async function Home() {
  return (
    <main>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
        {links.map((l) => (
          <Link href={`/${l}`} key={l}>
            <LinkCard link={l} />
          </Link>
        ))}
      </div>
    </main>
  );
}
