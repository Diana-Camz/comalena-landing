'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { complementsMenu, pizzaMenu, ingredients } from "@/data/data";
import Image from "next/image";
import { useMemo, useState, useEffect, useRef } from "react";
import type { ComplementForModal, ComplementItem, ComplementSize, PizzaForModal, PizzaItem, PizzaSize } from "@/types/types";
import { useCart } from "@/context/CartContext";
import SizeSelectionPizzaModal from "@/components/SizeSelectionPizzaModal";
import DetailsModal from "@/components/DetailsModal";
import TagButton from "@/components/TagButtonMenu";
import ComplementCard from "@/components/ComplementCard";
import SizeSelectionComplementModal from "@/components/SizeSelectionComplementModal";

export default function MenuPage() {
   const filtersRef = useRef<HTMLDivElement | null>(null);
   const [tagsPizzaSelected, setTagsPizzaSelected] = useState<string[]>([]);
   const [tagsSubmenuSelected, setTagsSubmenuSelected] = useState<string[]>([]);
   const [activeDetails, setActiveDetails] = useState<PizzaItem | null>(null);
   const [activeSizeSelection, setActiveSizeSelection] = useState<PizzaForModal |null>(null);
   const [activeComplementSelection, setActiveComplementSelection] = useState<ComplementForModal |null>(null);
   const [selectedSize, setSelectedSize] = useState<Record<PizzaSize, number>>({sm: 0, md: 0, lg: 0});
   const [selectedComplementSizes, setSelectedComplementSizes] = useState<Record<ComplementSize, number>>({sm: 0,md: 0,lg: 0,unit: 0});
   const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
   const [selectedPizzas, setSelectedPizzas] = useState<string[]>([]);
   const { addOrderItem } = useCart();
   const pizzasWithSingleIngredient = ["pizza-20", "pizza-21"]
   const isBasicPizza = activeSizeSelection?.pizzaId === "pizza-1";
   const isHalfPizza = activeSizeSelection?.pizzaId === "pizza-2";

   useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile && filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);
    
   const toggleTag = (tag: string, checked: boolean, type?: string ) => {
    if(type === "submenu"){
        setTagsSubmenuSelected((prev) => {
            if (checked) return prev.includes(tag) ? prev : [...prev, tag];
            return prev.filter((t) => t !== tag)
        })
    }
    setTagsPizzaSelected((prev) => {
      if (checked) return prev.includes(tag) ? prev : [...prev, tag];
      return prev.filter((t) => t !== tag);
    });
  };

   const resetModal = () => {
        setActiveSizeSelection(null);
        setActiveComplementSelection(null);
        setSelectedSize({ sm: 0, md: 0, lg: 0});
        setSelectedIngredients([]);
        setSelectedPizzas([]);
        setSelectedComplementSizes({sm: 0, md: 0, lg: 0, unit: 0});
   }
    const halfPizzas = pizzaMenu.filter((pizza) => selectedPizzas.includes(pizza.id)) //Array con las pizzas seleccionadas para mitad y mitad
    const halfPizzasPrice = halfPizzas.reduce<(typeof halfPizzas)[number] | null>((acc, pizza) => {
        if (!acc) return pizza;
        return pizza.prices.lg > acc.prices.lg ? pizza : acc;
    }, null); //Array que devuelve la pizza con mayor precio.

    const pricesForAllPizzas = halfPizzas && halfPizzasPrice ? halfPizzasPrice.prices : activeSizeSelection?.prices ?? {sm: 0, md: 0, lg: 0}; //Si hay pizzas seleccionadas para mitad y mitad, usar los precios de la pizza más cara, si no, usar los precios de la pizza activa o 0 si no hay pizza activa.  
    const arrSelectedIngredients = ingredients.filter((ingredient) => selectedIngredients.includes(ingredient.slug));
    const extraIngredientsPriceBySize = isBasicPizza 
        ? {sm: 0, md: 0, lg: 0}
        : arrSelectedIngredients.reduce((acc, ingredient) => ({
            sm: acc.sm + ingredient.price.sm,
            md: acc.md + ingredient.price.md,
            lg: acc.lg + ingredient.price.lg,
        }), {sm: 0, md: 0, lg: 0}
        );
    const pricesForPizzas = {
        sm: (activeSizeSelection?.prices.sm ?? 0) + extraIngredientsPriceBySize.sm,
        md: (activeSizeSelection?.prices.md  ?? 0) + extraIngredientsPriceBySize.md,
        lg: (activeSizeSelection?.prices.lg ?? 0) + extraIngredientsPriceBySize.lg,
        };

    const handleAddToCart = () => {
        if (!activeSizeSelection && !activeComplementSelection) return;

        if (activeSizeSelection) {
        const { pizzaId, title, prices } = activeSizeSelection;

        
        const pricesToUse = isHalfPizza 
            ? pricesForAllPizzas 
            : isBasicPizza
                ? prices
                : pricesForPizzas;
        if("sm" in prices){
            (["sm", "md", "lg"] as const).forEach((size) => {
            const qty = selectedSize[size];
            const price = pricesToUse[size];
            
            if (qty > 0 && price !== undefined) {
            addOrderItem({
                itemId: pizzaId,
                title,
                itemType: "pizza",
                size,
                unitPrice: price,
                quantity: qty,
                selectedIngredients,
                selectedPizzas
            });
            }
        });
        }
        resetModal();
    }
    if (activeComplementSelection) {
        const { complementId, title, prices } = activeComplementSelection;

        if("unit" in prices){
            if (selectedComplementSizes.unit > 0) {
            addOrderItem({
                itemId: complementId,
                title,
                itemType: "complement",
                size: "unit",
                unitPrice: prices.unit,
                quantity: selectedComplementSizes.unit,
            });
            }
        } else {
            (["sm", "md", "lg"] as const).forEach((size) => {
            const qty = selectedComplementSizes[size];
            if (qty > 0) {
            addOrderItem({
                itemId: complementId,
                title,
                itemType: "complement",
                size,
                unitPrice: prices[size],
                quantity: qty,
            });
            }
            });
        }
        resetModal();
    }
}

   const filteredPizzas = useMemo(() => {
    const originalMenu = pizzaMenu.filter((pizza) => !pizzasWithSingleIngredient.includes(pizza.id))
    if (tagsPizzaSelected.length === 0) return originalMenu;
    return pizzaMenu.filter((pizza: PizzaItem) =>
      pizza.tags?.some((t: string) => tagsPizzaSelected.includes(t))
    );
  }, [tagsPizzaSelected]);

     const filteredComplements = useMemo(() => {
    if (tagsSubmenuSelected.length === 0) return null;
    return complementsMenu.filter((complement: ComplementItem) =>
      complement.tags?.some((t: string) => tagsSubmenuSelected.includes(t))
    );
  }, [tagsSubmenuSelected]);




    return (
        <Layout>
            <section className="py-8">
                <div className="flex justify-center flex-col md:flex-row mb-8">
                    <div className="w-full flex justify-center items-center flex-col mb-8 mt--20">
                        <p className="lg:mt-2 font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl text-red/90 ">Conoce nuestros tamaños</p>
                        <div className="relative md:mt-6 w-full max-w-[370px] md:max-w-[360px] lg:max-w-[460px] aspect-[3.5/2]">
                            <Image src='/images/menu/tamanos.svg' alt='tamanos de pizza' fill sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 500px, 420px" className="object-contain"/>
                        </div>
                    </div>
                    <div ref={filtersRef} className="w-full flex items-center flex-col scroll-mt-40">
                        <p className="lg:mt-2 font-medium text-lg sm:text-2xl md:text-3xl lg:text-4xl text-red/90">Filtra según tu antojo</p>
                        <div className="mt-3 md:mt-8 flex flex-wrap gap-3 justify-center lg:justify-start max-w-[720px]">
                            <TagButton
                                label="Todas"
                                active={tagsPizzaSelected.length === 0}
                                onClick={() =>
                                    setTagsPizzaSelected([])
                                }
                                />
                            <TagButton
                                label="Tradicionales"
                                active={tagsPizzaSelected.includes("tradicional")}
                                onClick={() =>
                                    toggleTag(
                                    "tradicional",
                                    !tagsPizzaSelected.includes("tradicional")
                                    )
                                }
                                />
                            <TagButton
                                label="De la Casa"
                                active={tagsPizzaSelected.includes("de-la-casa")}
                                onClick={() =>
                                    toggleTag(
                                    "de-la-casa",
                                    !tagsPizzaSelected.includes("de-la-casa")
                                    )
                                }
                                />
                            <TagButton
                                label="Especialidades"
                                active={tagsPizzaSelected.includes("especial")}
                                onClick={() =>
                                    toggleTag(
                                    "especial",
                                    !tagsPizzaSelected.includes("especial")
                                    )
                                }
                                />
                            <TagButton
                                label="Vegetarianas"
                                active={tagsPizzaSelected.includes("vegetariana")}
                                onClick={() =>
                                    toggleTag(
                                    "vegetariana",
                                    !tagsPizzaSelected.includes("vegetariana")
                                    )
                                }
                                />
                            <TagButton
                                label="Picantes"
                                active={tagsPizzaSelected.includes("picante")}
                                onClick={() =>
                                    toggleTag(
                                    "picante",
                                    !tagsPizzaSelected.includes("picante")
                                    )
                                }
                                />
                            <TagButton
                                label="Frijoles"
                                active={tagsPizzaSelected.includes("frijoles")}
                                onClick={() =>
                                    toggleTag(
                                    "frijoles",
                                    !tagsPizzaSelected.includes("frijoles")
                                    )
                                }
                            />
                            <TagButton
                                label="Carnes frías"
                                active={tagsPizzaSelected.includes("carnes")}
                                onClick={() =>
                                    toggleTag(
                                    "carnes",
                                    !tagsPizzaSelected.includes("carnes")
                                    )
                                }
                            />
                            <TagButton
                                label="Más pedidas"
                                active={tagsPizzaSelected.includes("mas-pedida")}
                                onClick={() =>
                                    toggleTag(
                                    "mas-pedida",
                                    !tagsPizzaSelected.includes("mas-pedida")
                                    )
                                }
                            />
                            <TagButton
                                label="Arma tu pizza"
                                active={tagsPizzaSelected.includes("arma-tu-pizza")}
                                onClick={() =>
                                    toggleTag(
                                    "arma-tu-pizza",
                                    !tagsPizzaSelected.includes("arma-tu-pizza")
                                    )
                                }
                            />
                            <div className="flex flex-wrap mt-3 gap-3">
                            <TagButton
                                label="Complementos"
                                type={"submenu"}
                                active={tagsSubmenuSelected.includes("complemento")}
                                onClick={() =>
                                    toggleTag(
                                    "complemento",
                                    !tagsSubmenuSelected.includes("complemento"),
                                    "submenu"
                                     )
                                }
                            />
                            <TagButton
                                label="Postres"
                                type={"submenu"}
                                active={tagsSubmenuSelected.includes("postre")}
                                onClick={() =>
                                    toggleTag(
                                    "postre",
                                    !tagsSubmenuSelected.includes("postre"),
                                    "submenu"
                                    )
                                }
                            />
                            <TagButton
                                label="Bebidas"
                                type={"submenu"}
                                active={tagsSubmenuSelected.includes("bebida")}
                                onClick={() =>
                                    toggleTag(
                                    "bebida",
                                    !tagsSubmenuSelected.includes("bebida"),
                                    "submenu"
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
                </div>
                <div className="grid max-[730px]:grid-cols-2 mt-4 gap-4 max-[1130px]:grid-cols-3 max-[1580px]:grid-cols-4 min-[1580px]:grid-cols-3">
                    {filteredComplements?.map((complement) => (
                        <ComplementCard 
                            key={complement.id} {...complement}
                            onOpenSizeSelection={() => {setActiveComplementSelection({
                                complementId: complement.id,
                                title: complement.title,
                                prices: complement.prices
                            }); 
                                setSelectedComplementSizes({sm: 0, md: 0, lg: 0, unit: 0});
                            }}
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
                    selectedPizzas={selectedPizzas}
                    setSelectedPizzas={setSelectedPizzas}
                    pricesForAllPizzas={pricesForAllPizzas}
                    arrSelectedIngredients={arrSelectedIngredients}
                    handleAddToCart={handleAddToCart}
                />
            )}
            {activeComplementSelection && (
                <SizeSelectionComplementModal
                    setActiveComplementSelection={setActiveComplementSelection}
                    activeComplement={activeComplementSelection}
                    selectedComplementSizes={selectedComplementSizes}
                    setSelectedComplementSizes={setSelectedComplementSizes}
                    handleAddToCart={handleAddToCart}
                />
             )

            }
        </Layout>
    )
}