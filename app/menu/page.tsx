'use client';
import Layout from "@/components/Layout";
import MenuCard from "@/components/MenuCard";
import { pizzasMenu } from "@/data/data";
import Image from "next/image";
import { useMemo, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import type { PizzaForModal, PizzaItem, Size } from "@/types/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";


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

    const increase = (size: Size) => {
    setSelectedSize((prev) => ({
        ...prev,
        [size]: prev[size] + 1,
    }));
    };

    const decrease = (size: Size) => {
    setSelectedSize((prev) => ({
        ...prev,
        [size]: Math.max(0, prev[size] - 1),
    }));
    };

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
            {activeSizeSelection && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
                    onClick={() => setActiveSizeSelection(null)}>
                    <div
                        className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-lg p-4 md:p-0 rounded-2xl bg-input sm:p-6 md:p-8 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                    <div className="flex justify-end mb-2">
                       <button
                        type="button"
                        onClick={() => {setActiveSizeSelection(null); setSelectedSize({sm: 0, md: 0, lg: 0});}}
                        className="text-red hover:text-red/80 cursor-pointer active:scale-80 transition duration-120"
                       >
                        <IoMdCloseCircle 
                         className="
                            w-8 h-8
                            sm:w-9 sm:h-9
                            md:w-10 md:h-10
                        "/>
                       </button>
                    </div>
                    <h3 className="text-[clamp(1.2rem,2.5vw,2rem)] text-red font-gothic mb-2 text-center">
                        Selecciona el tamaño de tu pizza
                    </h3>
                    <div className="flex flex-col items-center gap-2">
                        <p className=" text-lg md:text-xl font-medium text-card-foreground mb-4">{activeSizeSelection?.title}</p> 
                        {[{key: "sm", label: "Chica", subtotal: subtotalSm},
                          {key: "md", label: "Mediana", subtotal: subtotalMd},
                          {key: "lg", label: "Grande", subtotal: subtotalLg}
                         ].map(({key, label, subtotal}) => (
                            <div key={key} className="flex items-center gap-4 border-b-2 border-red/20 py-2 w-full max-w-xs"> 
                                <button 
                                onClick={() => decrease(key as Size)}
                                className="cursor-pointer">
                                    <CiCircleMinus className="w-10 h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background "/>
                                </button>
                                <p className="font-medium w-4 text-center">{selectedSize[key as Size]}</p>
                                <button 
                                onClick={() => increase(key as Size)}
                                className="cursor-pointer">
                                    <CiCirclePlus className="w-10 h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background"/>
                                </button>
                                <div className="flex justify-between w-44 items-center">
                                    <p className=" font-gothic text-[clamp(1.2rem,2.5vw,1.4rem)]">{label}</p>
                                    <p className="font-medium text-card-foreground/80"> = {subtotal.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                                </div>
                            </div>
                            ))}

                           <div className="flex flex-col w-full max-w-xs mt-4">
                             <div className="flex justify-between mb-2">
                                <p className="font-gothic text-lg md:text-xl text-card-foreground">Subtotal: </p>
                                <p className="font-medium text-red text-xl">{totalSubtotal.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                             </div>
                             <div  className="flex items-center justify-center mt-3">
                                <Button 
                                    onClick={() => handleAddToCart()}
                                    className="w-full cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
                                    <p className="text-md md:text-lg">Agregar al carrito</p>
                                </Button>
                             </div>
                           </div>
                        </div>
                    </div>

                </div>
            )}
        </Layout>
    )
}