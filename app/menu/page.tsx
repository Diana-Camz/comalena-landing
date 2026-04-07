'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { complementsMenu, pizzaMenu } from "@/data/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { ComplementForModal, PizzaForModal, PizzaItem } from "@/types/types";
import { useCart } from "@/context/CartContext";
import SizeSelectionPizzaModal from "@/components/SizeSelectionPizzaModal";
import DetailsModal from "@/components/DetailsModal";
import TagButton from "@/components/TagButtonMenu";
import ComplementCard from "@/components/ComplementCard";
import SizeSelectionComplementModal from "@/components/SizeSelectionComplementModal";

export default function MenuPage() {
   const [tagsSelected, setTagsSelected] = useState<string[]>([]);
   const [activeDetails, setActiveDetails] = useState<PizzaItem | null>(null);
   const [activeSizeSelection, setActiveSizeSelection] = useState<PizzaForModal |null>(null);
   const [activeComplementSelection, setActiveComplementSelection] = useState<ComplementForModal |null>(null);
   const [selectedSize, setSelectedSize] = useState({sm: 0, md: 0, lg: 0});
   const [selectedIngredients, setSelectedIngredients] = useState<string[] | []>([]);
   const { addOrderItem } = useCart();
    
   const toggleTag = (tag: string, checked: boolean) => {
    setTagsSelected((prev) => {
      if (checked) return prev.includes(tag) ? prev : [...prev, tag];
      return prev.filter((t) => t !== tag);
    });
  };

   const resetModal = () => {
        setActiveSizeSelection(null);
        setActiveComplementSelection(null);
        setSelectedSize({ sm: 0, md: 0, lg: 0 });
        setSelectedIngredients([]);
   }

    const handleAddToCart = () => {
        if (!activeSizeSelection && !activeComplementSelection) return;

        if (activeSizeSelection) {
            const { pizzaId, title, prices } = activeSizeSelection;

        (["sm", "md", "lg"] as const).forEach((size) => {
            const qty = selectedSize[size];
            
            if (qty > 0) {
            addOrderItem({
                itemId: pizzaId,
                title,
                itemType: "pizza",
                size,
                unitPrice: prices[size],
                quantity: qty,
                selectedIngredients
            });
            }
        });
        resetModal();
    }
    if (activeComplementSelection) {
            const { complementId, title, prices } = activeComplementSelection;

        (["sm", "md", "lg"] as const).forEach((size) => {
            const qty = selectedSize[size];
            
            if (qty > 0) {
            addOrderItem({
                itemId: complementId,
                title,
                itemType: "complement",
                size,
                unitPrice: prices[size],
                quantity: qty,
                selectedIngredients
            });
            }
        });
        resetModal();
    }
}

   const filteredPizzas = useMemo(() => {
    if (tagsSelected.length === 0) return pizzaMenu;
    return pizzaMenu.filter((pizza: PizzaItem) =>
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
                            <div className="flex flex-wrap mt-3 gap-3">
                            <TagButton
                                label="Complementos"
                                type={"submenu"}
                                active={tagsSelected.includes("complemento")}
                                onClick={() =>
                                    toggleTag(
                                    "complemento",
                                    !tagsSelected.includes("complemento")
                                     )
                                }
                            />
                            <TagButton
                                label="Postres"
                                type={"submenu"}
                                active={tagsSelected.includes("postre")}
                                onClick={() =>
                                    toggleTag(
                                    "postre",
                                    !tagsSelected.includes("postre")
                                    )
                                }
                            />
                            <TagButton
                                label="Bebidas"
                                type={"submenu"}
                                active={tagsSelected.includes("bebida")}
                                onClick={() =>
                                    toggleTag(
                                    "bebida",
                                    !tagsSelected.includes("bebida")
                                    )
                                }
                            />
                            </div>
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
                    {complementsMenu.map((complement) => (
                        <ComplementCard 
                            key={complement.id} {...complement}
                            onOpenSizeSelection={() => {setActiveComplementSelection({
                                complementId: complement.id,
                                title: complement.title,
                                prices: complement.prices
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
                <SizeSelectionPizzaModal
                    setActiveSizeSelection={setActiveSizeSelection}
                    activeSizeSelection={activeSizeSelection}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    selectedIngredients={selectedIngredients}
                    setSelectedIngredients={setSelectedIngredients}
                    handleAddToCart={handleAddToCart}
                />
            )}
            {activeComplementSelection && (
                <SizeSelectionComplementModal
                    setActiveSizeSelection={setActiveComplementSelection}
                    activeComplement={activeComplementSelection}
                    selectedSize={selectedSize}
                    setSelectedSize={setSelectedSize}
                    handleAddToCart={handleAddToCart}
                />
             )

            }
        </Layout>
    )
}