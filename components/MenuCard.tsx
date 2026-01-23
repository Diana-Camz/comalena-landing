import Image from "next/image";
import type { Pizza } from "@/app/menu/page";

export default function MenuCard({id, title, ingredients, imageUrl, prices, tags}: Pizza) {
  return (
    <div className="flex border justify-start bg-ring/2 p-3 items-center rounded-lg hover:shadow-md hover:bg-ring/5 transition-shadow duration-200 ease-in-out ">
      <div className="">
        <Image src={imageUrl} alt={title} width={100} height={100} className="rounded-lg object-cover h-36 w-44"/>
      </div>
      <div className="w-110">
        <h3 className="text-2xl ml-4 text-red">{title}</h3>
        <p className="text-card-foreground/70 font-gothic text-xl mt-2 ml-4">{ingredients}</p>
        <div className="flex w-80 justify-evenly mt-4">
          <p className="text-2xl font-gothic">ch <span >${prices.sm}</span></p>
          <p className="text-2xl font-gothic">med <span >${prices.md}</span></p>
          <p className="text-2xl font-gothic">gde <span >${prices.lg}</span></p>
        </div>
      </div>
    </div>
  )}