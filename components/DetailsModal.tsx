import { PizzaItem } from "@/types/types";
import Image from "next/image";
import { FaCheck } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";

interface DetailsModalProps {
    setActiveDetails: (value: PizzaItem | null) => void;
    activeDetails: PizzaItem
}

export default function DetailsModal({setActiveDetails, activeDetails}: DetailsModalProps) {
      const TAG_LABELS: Record<string, string> = {
      especial: "Especialidad",
      "mas-pedida": "La más pedida",
      picante: "Picante",
      vegetariana: "Vegetariana",
      frijoles: "Con frijoles",
      carnes: "Con carnes frías",
      tradicional: "Tradicional",
      "de-la-casa": "De la casa",
      complemento: "Complemento",
    
    };
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
            onClick={() => setActiveDetails(null)}
        >
            <div
            className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-4xl xl:max-w-6xl rounded-2xl bg-input p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            >
                <div className="relative bottom-3 left-3 md:bottom-5 md:left-5 flex justify-end">
                <button
                type="button"
                onClick={() => setActiveDetails(null)}
                className=" text-card-foreground/80 cursor-pointer active:scale-80 transition duration-120"
                >
                <IoMdCloseCircle 
                    className="
                    w-8 h-8
                    sm:w-9 sm:h-9
                    md:w-12 md:h-12
                    lg:w-13 lg:h-13 
                "/>
                </button>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 lg:flex-row lg:items-start">
                {/* Imagen (fill) */}
                <div
                className="
                    relative w-full
                    max-w-[320px] sm:max-w-[420px] md:max-w-none
                    aspect-[4/3] sm:aspect-square lg:aspect-square
                    overflow-hidden rounded-xl
                    mx-auto lg:mx-0
                    lg:w-[480px] xl:w-[580px]
                    shrink-0
                "
                >
                <Image
                    src={activeDetails.imageUrl}
                    alt={activeDetails.title}
                    fill
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, (max-width: 1280px) 480px, 720px"
                    className="object-cover"
                />
                </div>

            {/* Texto */}
                <div className="w-full lg:mt-10">
                <h3 className="text-[clamp(1.5rem,3.5vw,4rem)] text-red">
                    {activeDetails.title}
                </h3>

                <p className="mt-2 sm:mt-3 text-card-foreground/70 font-gothic text-[clamp(0.95rem,2.2vw,1.4rem)] leading-snug">
                    {activeDetails.ingredients}
                </p>

                    <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-end md:justify-start">
                        {activeDetails.tags &&
                        activeDetails.tags.map((tag, idx) => (
                            <h3
                            key={idx}
                            className="
                                inline-flex items-center
                                rounded-full border-2 border-red/60
                                px-2.5 py-1
                                text-[clamp(0.75rem,1.6vw,1.1rem)]
                                text-card-foreground/70 font-gothic
                            "
                            >
                            <FaCheck className="mr-2 text-secondary" />
                            {TAG_LABELS[tag] || tag}
                            </h3>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}