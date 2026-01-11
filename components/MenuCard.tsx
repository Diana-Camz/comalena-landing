import Image from "next/image";
import type { Pizza } from "@/app/menu/page";

export default function MenuCard({id, title, ingredients, imageUrl, prices, tags}: Pizza) {
  return (
    <div className="flex border justify-start p-3 items-center rounded-lg hover:shadow-md hover:bg-ring/5 transition-shadow duration-200 ease-in-out ">
      <div className="">
        <Image src={imageUrl} alt={title} width={100} height={100} className="rounded-lg object-cover h-36 w-44"/>
      </div>
      <div className="w-110">
        <h3 className="font-display text-2xl ml-4 tracking-wide">{title}</h3>
        <p className="text-foreground/80 mt-2 ml-4">{ingredients}</p>
        <div className="flex w-80 justify-evenly mt-4">
          <p>ch <span className="text-lg">${prices.sm}</span></p>
          <p>med <span className="text-lg">${prices.md}</span></p>
          <p>gde <span className="text-lg">${prices.lg}</span></p>
        </div>
      </div>
    </div>
  )}