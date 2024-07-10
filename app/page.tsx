import Link from "next/link";
import Card from "./components/Card";
import GridCard from "./components/GridCard";

export default async function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const cards = await prisma?.card.findMany({});
  const currentPage =
    searchParams && (searchParams.cardId as string | undefined);
  console.log({ cards });
  return (
    <div className="w-[100vw] mt-[5vh] border-2 border-dashed border-white h-[90vh] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <GridCard searchParams={searchParams} />
      {cards?.map((card) => (
        <Link
          href={"/?cardId=" + card.id}
          key={card.id}
          className={` p-4 h-[350px] flex flex-col gap-1 justify-start items-start cursor-pointer text-md font-bold`}
          style={{
            background: card.bg ? card.bg : "white",
            color: "black",
          }}
        >
          <span>Name: {card.name}</span>

          <span>Created: {card.createdAt.toISOString()}</span>
          <span>Last Update: {card.updatedAt.toISOString()}</span>
        </Link>
      ))}
      {currentPage && (
        <Card cardId={currentPage === "0edit" ? undefined : currentPage} />
      )}
    </div>
  );
}
