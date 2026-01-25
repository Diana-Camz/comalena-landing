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
        px-4 py-2 rounded-full text-lg transition 
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
  especialidad: "Especialidad",
  "mas-pedida": "La más pedida",
  picosa: "Picosa",
  vegetariana: "Vegetariana",
  frijoles: "Con frijoles",
  carnes: "Con carnes frías",
  clasica: "Clásica",

};


    return (
        <Layout>
            <section className="py-8">
                <div className="flex justify-evenly">
                    <div className="flex justify-center items-center flex-col mb-8">
                        <p className=" lg:text-3xl tracking-wide text-red/90">Conoce nuestros tamaños</p>
                    <Image src='/images/tamanos.svg' alt='tamanos de pizza' width={600} height={100} className="object-covermb-8 mt-10"/>
                    </div>
                    <div className="flex items-center flex-col mb-8">
                        <p className="lg:text-3xl tracking-wide text-red/90">Filtra según tu antojo</p>
                        <div className="gap-4 grid grid-cols-3 items-center mt-10">
                            <TagButton
                                label="Todas"
                                active={tagsSelected.length === 0}
                                onClick={() =>
                                    setTagsSelected([])
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
                                label="Clásicas"
                                active={tagsSelected.includes("clasica")}
                                onClick={() =>
                                    toggleTag(
                                    "clasica",
                                    !tagsSelected.includes("clasica")
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
                                label="Picosas"
                                active={tagsSelected.includes("picosa")}
                                onClick={() =>
                                    toggleTag(
                                    "picosa",
                                    !tagsSelected.includes("picosa")
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
                <div className="lg:my-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setActive(null)}
                >
                    <div
                    className="relative flex w-full max-w-6xl rounded-2xl bg-input p-10"
                    onClick={(e) => e.stopPropagation()}
                    >
                    <div className="relative w-1/2  pb-[50%] overflow-hidden rounded-2xl">
                        <Image
                        src={active.imageUrl}
                        alt={active.title}
                        fill
                        className="object-cover"
                        priority
                        />
                    </div>

                    <div className="w-1/2 pl-6 mt-20 flex flex-col justify-start items-start">
                        <h3 className="text-6xl mt-4 text-red">{active.title}</h3>
                        <p className="text-card-foreground/70 font-gothic text-2xl mt-4">{active.ingredients}</p>
                        <div className="mt-12">
                            {active.tags && active.tags.map((tag, idx) => (
                                <span key={idx} className="inline-block text-card-foreground/70 md:text-2xl font-gothic mr-2 mb-2 px-3 py-1 rounded-full border-red/60 border-2">
                                    <FaCheck className="inline-block mr-2 text-secondary"/>
                                    {TAG_LABELS[tag] || tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="absolute right-1 top-2 px-1 text-sm text-card-foreground/80 cursor-pointer"
                    >
                        <IoMdCloseCircle size={45}/>
                    </button>
                    </div>
                </div>
            )}
        </Layout>
    )
}