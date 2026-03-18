import Image from "next/image";
import type { PizzaItem } from "@/types/types";
import { TagButtonMenu } from "./TagButtonMenu";

export default function MenuCard({title, ingredients, imageUrl, prices}: PizzaItem) {
  
  return (
    <div className="
            mx-auto w-full
            group flex flex-col items-stretch max-w-[320px] md:max-w-[400px] lg:max-w-none min-[1580px]:flex-row min-[1580px]:items-start bg-ring/2 rounded-lg hover:shadow-md hover:bg-ring/5 transition-shadow duration-200 ease-in-out gap-4 border-2">
      <div className="relative w-full min-[1580px]:w-[200px] aspect-[4/3] min-[1580px]:aspect-square min-[1580px]:m-2 overflow-hidden shrink-0 rounded-t-lg min-[1580px]:rounded-xl">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 100vw, 240px"
          className="object-cover" />
      </div>
      <div className=" w-full flex flex-col justify-evenly">
        <div className="mx-2 min-[1580px]:mx-0 lg:mr-2 lg:mt-1 xl:mt-4">
          <h3 className="text-[clamp(.90rem,3.2vw,2rem)] min-[731px]:text-[clamp(1.1rem,1.1vw,1.15rem)] min-[900px]:text-[clamp(1.5rem,1.2vw,1.25rem)] text-red text-start">{title}</h3>
          <p className="text-card-foreground/70 font-gothic text-[clamp(0.80rem,3.1vw,1.3rem)]  min-[731px]:text-[clamp(0.84rem,1.1vw,1.15rem)] min-[900px]:text-[clamp(.90rem,1.2vw,1.25rem)] mt-2 text-start min-h-14 leading-snug">{ingredients}</p>
        </div>
        <div className="flex max-[1580px]:justify-evenly min-[1580px]:mt-4 min-[1580px]:gap-10 mb-1 flex-wrap">
          {/* Chica */}
          <div className="flex flex-col-reverse items-center justify-center">
            <TagButtonMenu size="Ch" />
            <p className="text-[clamp(1rem,1vw,1.8rem)] min-[731px]:text-[clamp(1rem,1vw,1.9rem)] min-[900px]:text-[clamp(1.1rem,1.2vw,1.5rem)] font-gothic text-red/90">
              ${prices.sm}
            </p>
          </div>

          {/* Mediana */}
          <div className="flex flex-col-reverse items-center justify-center">
            <TagButtonMenu size="Med" />
            <p className="text-[clamp(1rem,1vw,1.8rem)] min-[731px]:text-[clamp(1rem,1vw,1.9rem)] min-[900px]:text-[clamp(1.1rem,1.2vw,1.5rem)] font-gothic text-red/90">
              ${prices.md}
            </p>
          </div>

          {/* Grande */}
          <div className="flex flex-col-reverse items-center justify-center">
            <TagButtonMenu size="Gde" />
            <p className="text-[clamp(1rem,1vw,1.8rem)] min-[731px]:text-[clamp(1rem,1vw,1.9rem)] min-[900px]:text-[clamp(1.1rem,1.2vw,1.5rem)] font-gothic text-red/90">
              ${prices.lg}
            </p>
          </div>
        </div>
      </div>
    </div>
  )}