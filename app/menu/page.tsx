'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/data/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import type { PizzaForModal, PizzaItem, Size } from "@/types/types";
import { useCart } from "@/context/CartContext";

import SizeSelectionModal from "@/components/SizeSelectionModal";
import DetailsModal from "@/components/DetailsModal";


type TagButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function TagButton({ label, active, onClick }: TagButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        px-3 lg:px-4 py-2 rounded-full text-[clamp(0.85rem,1.2vw,1.2rem)] transition cursor-pointer
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
   const [activeDetails, setActiveDetails] = useState<PizzaItem | null>(null);
   const [activeSizeSelection, setActiveSizeSelection] = useState<PizzaForModal | null>(null);
   const [selectedSize, setSelectedSize] = useState({sm: 0, md: 0, lg: 0});
   const { addOrderItem } = useCart();
    
   const toggleTag = (tag: string, checked: boolean) => {
    setTagsSelected((prev) => {
      if (checked) return prev.includes(tag) ? prev : [...prev, tag];
      return prev.filter((t) => t !== tag);
    });
  };

   const subtotalSm = activeSizeSelection
    ? selectedSize.sm * activeSizeSelection.prices.sm
    : 0;

    const subtotalMd = activeSizeSelection
    ? selectedSize.md * activeSizeSelection.prices.md
    : 0;

    const subtotalLg = activeSizeSelection
    ? selectedSize.lg * activeSizeSelection.prices.lg
    : 0;

    const totalSubtotal = subtotalSm + subtotalMd + subtotalLg;

    const handleAddToCart = () => {
        if (!activeSizeSelection) return;

        const { pizzaId, title, prices } = activeSizeSelection;

        (["sm", "md", "lg"] as const).forEach((size) => {
            const qty = selectedSize[size];
            
            if (qty > 0) {
            addOrderItem({
                pizzaId,
                title,
                size,
                unitPrice: prices[size],
                quantity: qty,
            });
            }
        });

        setActiveSizeSelection(null);
        setSelectedSize({ sm: 0, md: 0, lg: 0 });
    }

   const filteredPizzas = useMemo(() => {
    if (tagsSelected.length === 0) return pizzasMenu;
    return pizzasMenu.filter((pizza: PizzaItem) =>
      pizza.tags?.some((t: string) => tagsSelected.includes(t))
    );
  }, [tagsSelected]);




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
                        <MenuCard 
                            key={index} {...pizza} 
                            onOpenDetails={() => setActiveDetails(pizza)}
                            onOpenSizeSelection={() => {setActiveSizeSelection({
                                pizzaId: pizza.id.toString(),
                                title: pizza.title,
                                prices: pizza.prices
                            });
                            setSelectedSize({sm: 0, md: 0, lg: 0});} }
                        />
                    ))}
                </div>

            </section>
            {activeDetails && (
                <DetailsModal
                setActiveDetails={setActiveDetails}
                activeDetails={activeDetails}/>
            )}
            {activeSizeSelection && (
                <SizeSelectionModal
                    setActiveSizeSelection={setActiveSizeSelection}
                    activeSizeSelection={activeSizeSelection}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    handleAddToCart={handleAddToCart}
                    subtotalSm={subtotalSm}
                    subtotalMd={subtotalMd}
                    subtotalLg={subtotalLg}
                    totalSubtotal={totalSubtotal}
                />
            )}
        </Layout>
    )
}