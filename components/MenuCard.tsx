import Image from "next/image";
import type { PizzaItem } from "@/types/types";
import { FaSquarePlus } from "react-icons/fa6";


type MenuCardProps = PizzaItem & {
  onOpenDetails: () => void;
  onOpenSizeSelection: () => void;
}

export default function MenuCard({title, ingredients, imageUrl, prices, onOpenDetails, onOpenSizeSelection}: MenuCardProps) {
  
  return (
    <div className="
            mx-auto w-full
            group flex h-full flex-col items-stretch max-w-[320px] md:max-w-[400px] lg:max-w-none min-[1580px]:flex-row min-[1580px]:items-stretch bg-ring/2 rounded-lg hover:shadow-md hover:bg-ring/5 transition-shadow duration-200 ease-in-out gap-4 border-2 pb-2">
      <button 
        type="button"
        onClick={onOpenDetails}
        className="relative w-full min-[1580px]:w-[200px] aspect-[4/3] min-[1580px]:aspect-square min-[1580px]:m-2 overflow-hidden shrink-0 rounded-t-lg min-[1580px]:rounded-xl cursor-pointer">
        <Image 
          src={imageUrl} 
          alt={title} 
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 100vw, 240px"
          className="object-cover" />
      </button>
      <div className="flex h-full w-full flex-1 flex-col">
        <button 
          type="button"
          onClick={onOpenDetails}
          className="mx-2 min-[1580px]:mx-0 lg:mr-2 lg:mt-1 xl:mt-4 cursor-pointer">
          <h3 className="text-[clamp(.90rem,3.2vw,2rem)] min-[731px]:text-[clamp(1.1rem,1.1vw,1.15rem)] min-[900px]:text-[clamp(1.5rem,1.2vw,1.25rem)] text-red text-start">{title}</h3>
          <p className="text-card-foreground/70 font-gothic text-[clamp(0.80rem,3.1vw,1.3rem)]  min-[731px]:text-[clamp(0.84rem,1.1vw,1.15rem)] min-[900px]:text-[clamp(.90rem,1.2vw,1.25rem)] mt-2 text-start min-h-14 leading-snug">{ingredients}</p>
        </button>
        <div className="mt-auto pt-3">
          <div className="flex w-full justify-end pr-1.5">
              <button 
                  type="button"
                  onClick={onOpenSizeSelection}
                  className="text-secondary/90 hover:text-secondary/70 cursor-pointer active:scale-80 transition duration-120"
              >
              <FaSquarePlus 
                  className="
                  w-9 h-9
                  md:w-12 md:h-12
                  lg:w-13 lg:h-13"
              />
              </button>
          </div>
        </div>
      </div>
    </div>
  )} 
