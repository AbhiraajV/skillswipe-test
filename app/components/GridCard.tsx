import Link from "next/link";
import React from "react";

type Props = {};

function GridCard({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="bg-orange-400 text-black h-[80px] md:h-[350px] p-4 relative cursor-pointer">
      <Link href={"/?cardId=0edit"}>
        <span className="text-md font-bold">Create new Card</span>
        <span className="absolute flex justify-center items-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[2rem] md:text-[6rem] border-4 w-[50px] h-[50px] md:w-[100px] md:h-[100px] border-black rounded-[50%]">
          +
        </span>
      </Link>
    </div>
  );
}

export default GridCard;
