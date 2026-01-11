'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/data/data";
import Image from "next/image";
import { useMemo, useState } from "react";

type TagButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export type Pizza = {
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
        px-4 py-2 rounded-full text-sm font-medium transition
        ${
          active
            ? "bg-primary text-background"
            : "bg-background text-foreground ring-1 ring-black/10 hover:bg-foreground/5"
        }
      `}
    >
      {label}
    </button>
  );
}

export default function MenuPage() {
   const [tagsSelected, setTagsSelected] = useState<string[]>([]);
    
   const toggleTag = (tag: string, checked: boolean) => {
    setTagsSelected((prev) => {
      if (checked) return prev.includes(tag) ? prev : [...prev, tag];
      return prev.filter((t) => t !== tag);
    });
  };

   const filteredPizzas = useMemo(() => {
    if (tagsSelected.length === 0) return pizzasMenu;
    // si la pizza tiene AL MENOS 1 tag seleccionado, se muestra
    return pizzasMenu.filter((pizza: Pizza) =>
      pizza.tags?.some((t: string) => tagsSelected.includes(t))
    );
  }, [tagsSelected]);

    return (
        <Layout>
            <section className="py-8">
                <div className="flex justify-evenly">
                    <div className="flex justify-center items-center flex-col mb-8">
                        <p className="font-display lg:text-4xl tracking-wide ">Conoce nuestros tamanos</p>
                    <Image src='/images/tamanos-pizza.jpg' alt='tamanos de pizza' width={600} height={100} className="border rounded-lg object-covermb-8"/>
                    </div>
                    <div className="flex items-center flex-col mb-8">
                        <p className="font-display lg:text-4xl tracking-wide">Filtra segun tu antojo</p>
                        <div className="gap-4 grid grid-cols-3 items-center mt-4">
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
                                label="Clasicas"
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
                                label="Carnes frias"
                                active={tagsSelected.includes("carnes")}
                                onClick={() =>
                                    toggleTag(
                                    "carnes",
                                    !tagsSelected.includes("carnes")
                                    )
                                }
                            />
                            <TagButton
                                label="Mas pedidas"
                                active={tagsSelected.includes("mas pedidas")}
                                onClick={() =>
                                    toggleTag(
                                    "mas pedidas",
                                    !tagsSelected.includes("mas pedidas")
                                    )
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="lg:mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                     {filteredPizzas.map((pizza: Pizza, index: number) => (
                        <MenuCard key={index} {...pizza} />
                    ))}
                </div>

            </section>
        </Layout>
    )
}