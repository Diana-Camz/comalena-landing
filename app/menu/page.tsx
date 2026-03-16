'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/data/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";


type TagButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export type PizzaItem = {
    id: number;
    title: string;
    ingredients: string;
    imageUrl: string;
    prices: {sm: number, md: number, lg: number};
    tags?: string[];
}

function TagButton({ label, active, onClick }: TagButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3 lg:px-4 py-2 rounded-full text-[clamp(0.85rem,1.2vw,1.2rem)] transition 
        ${
          active
            ? "bg-secondary/70 text-background"
            : "bg-background text-card-foreground/75 ring-1 ring-black/10 hover:bg-ring/10"
        }
      `}
    >
      {label}
    </button>
  );
}

export default function MenuPage() {
   const [tagsSelected, setTagsSelected] = useState<string[]>([]);
   const [active, setActive] = useState<PizzaItem | null>(null);
    
   const toggleTag = (tag: string, checked: boolean) => {
    setTagsSelected((prev) => {
      if (checked) return prev.includes(tag) ? prev : [...prev, tag];
      return prev.filter((t) => t !== tag);
    });
  };

   const filteredPizzas = useMemo(() => {
    if (tagsSelected.length === 0) return pizzasMenu;
    return pizzasMenu.filter((pizza: PizzaItem) =>
      pizza.tags?.some((t: string) => tagsSelected.includes(t))
    );
  }, [tagsSelected]);

  const TAG_LABELS: Record<string, string> = {
  especial: "Especialidad",
  "mas-pedida": "La más pedida",
  picante: "Picante",
  vegetariana: "Vegetariana",
  frijoles: "Con frijoles",
  carnes: "Con carnes frías",
  tradicional: "Tradicional",
  "de-la-casa": "De la casa",

};


    return (
        <Layout>
            <section className="py-8">
                <div className="flex justify-center flex-col md:flex-row mb-8">
                    <div className="w-full flex justify-center items-center flex-col mb-8 ">
                        <p className="lg:mt-2 font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl text-red/90 ">Conoce nuestros tamaños</p>
                        <div className="relative md:mt-6 w-full max-w-[370px] md:max-w-[360px] lg:max-w-[460px] aspect-[3.5/2]">
                            <Image src='/images/menu/tamanos.svg' alt='tamanos de pizza' fill sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 500px, 420px" className="object-contain"/>
                        </div>
                    </div>
                    <div className="w-full flex items-center flex-col">
                        <p className="lg:mt-2 font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl text-red/90">Filtra según tu antojo</p>
                        <div className="mt-3 md:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start max-w-[720px]">
                            <TagButton
                                label="Todas"
                                active={tagsSelected.length === 0}
                                onClick={() =>
                                    setTagsSelected([])
                                }
                                />
                            <TagButton
                                label="Tradicionales"
                                active={tagsSelected.includes("tradicional")}
                                onClick={() =>
                                    toggleTag(
                                    "tradicional",
                                    !tagsSelected.includes("tradicional")
                                    )
                                }
                                />
                            <TagButton
                                label="De la Casa"
                                active={tagsSelected.includes("de-la-casa")}
                                onClick={() =>
                                    toggleTag(
                                    "de-la-casa",
                                    !tagsSelected.includes("de-la-casa")
                                    )
                                }
                                />
                            <TagButton
                                label="Especialidades"
                                active={tagsSelected.includes("especial")}
                                onClick={() =>
                                    toggleTag(
                                    "especial",
                                    !tagsSelected.includes("especial")
                                    )
                                }
                                />
                            <TagButton
                                label="Vegetarianas"
                                active={tagsSelected.includes("vegetariana")}
                                onClick={() =>
                                    toggleTag(
                                    "vegetariana",
                                    !tagsSelected.includes("vegetariana")
                                    )
                                }
                                />
                            <TagButton
                                label="Picantes"
                                active={tagsSelected.includes("picante")}
                                onClick={() =>
                                    toggleTag(
                                    "picante",
                                    !tagsSelected.includes("picante")
                                    )
                                }
                                />
                            <TagButton
                                label="Frijoles"
                                active={tagsSelected.includes("frijoles")}
                                onClick={() =>
                                    toggleTag(
                                    "frijoles",
                                    !tagsSelected.includes("frijoles")
                                    )
                                }
                            />
                            <TagButton
                                label="Carnes frías"
                                active={tagsSelected.includes("carnes")}
                                onClick={() =>
                                    toggleTag(
                                    "carnes",
                                    !tagsSelected.includes("carnes")
                                    )
                                }
                            />
                            <TagButton
                                label="Más pedidas"
                                active={tagsSelected.includes("mas-pedida")}
                                onClick={() =>
                                    toggleTag(
                                    "mas-pedida",
                                    !tagsSelected.includes("mas-pedida")
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="grid max-[730px]:grid-cols-2 gap-4 max-[1130px]:grid-cols-3 max-[1580px]:grid-cols-4 min-[1580px]:grid-cols-3">
                     {filteredPizzas.map((pizza: PizzaItem, index: number) => (
                        <button
                        key={pizza.id}
                        type="button"
                        onClick={() => setActive(pizza)}
                        className="cursor-pointer"
                        >
                          <MenuCard key={index} {...pizza} />
                        </button>
                    ))}
                </div>

            </section>
            {active && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
                    onClick={() => setActive(null)}
                >
                    <div
                    className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-4xl xl:max-w-6xl rounded-2xl bg-input p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                    >
                      <div className="relative bottom-3 left-3 md:bottom-5 md:left-5 flex justify-end">
                       <button
                        type="button"
                        onClick={() => setActive(null)}
                        className=" text-card-foreground/80 cursor-pointer"
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
                        src={active.imageUrl}
                        alt={active.title}
                        fill
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, (max-width: 1280px) 480px, 720px"
                        className="object-cover"
                    />
                    </div>

                    {/* Texto */}
                    <div className="w-full lg:mt-10">
                    <h3 className="text-[clamp(1.5rem,3.5vw,4rem)] text-red">
                        {active.title}
                    </h3>

                    <p className="mt-2 sm:mt-3 text-card-foreground/70 font-gothic text-[clamp(0.95rem,2.2vw,1.4rem)] leading-snug">
                        {active.ingredients}
                    </p>

                     <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-end md:justify-start">
                        {active.tags &&
                        active.tags.map((tag, idx) => (
                            <span
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
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
            )}
        </Layout>
    )
}