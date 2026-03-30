import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { PizzaForModal, Size } from "@/types/types";
import SwitchSizeAndIngredientButton from "./SwitchSizeAndIngredientButton";
import { useState } from "react";
import { ingredients } from "@/data/data";

interface SizeSelectionModalProps {
  activeSizeSelection: PizzaForModal | null;
  setActiveSizeSelection: (value: PizzaForModal | null) => void;
  selectedSize: { sm: number; md: number; lg: number };
  setSelectedSize: React.Dispatch<React.SetStateAction<{ sm: number; md: number; lg: number }>>;
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  handleAddToCart: () => void;
  subtotalSm: number;
  subtotalMd: number;
  subtotalLg: number;
  totalSubtotal: number;
}

export default function SizeSelectionModal({
    activeSizeSelection,
    setActiveSizeSelection,
    selectedSize,
    setSelectedSize,
    selectedIngredients,
    setSelectedIngredients,
    handleAddToCart,
    subtotalSm,
    subtotalMd,
    subtotalLg,
    totalSubtotal }: SizeSelectionModalProps) {
    
    const [showIngredients, setShowIngredients] = useState(false);

    const hasItems =
    selectedSize.sm > 0 ||
    selectedSize.md > 0 ||
    selectedSize.lg > 0;

    const isBasicPizza = activeSizeSelection?.title === "Básica";

    const isValid =
    hasItems && (!isBasicPizza || selectedIngredients.length > 0);

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

    return (
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
    onClick={() => {setActiveSizeSelection(null); setShowIngredients(false)}}>
    <div
        className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-lg p-4 md:p-0 rounded-2xl bg-input sm:p-6 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
    >
    <div className="flex justify-end mb-2">
        <button
        type="button"
        onClick={() => {setActiveSizeSelection(null); setSelectedSize({sm: 0, md: 0, lg: 0}); setShowIngredients(false)}}
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
        {`Selecciona el ${!showIngredients ? "tamaño" : "ingrediente"} de tu pizza`}
    </h3>
    <div className="flex flex-col items-center gap-2">
        <p className=" text-lg md:text-xl font-medium text-card-foreground mb-4">{activeSizeSelection?.title}</p>
        {activeSizeSelection?.pizzaId === "1" && (
            <div>
                <SwitchSizeAndIngredientButton 
                setShowIngredients={setShowIngredients} 
                showIngredients={showIngredients}/>
            </div>
        )} 
        {showIngredients ? (
            <div className="flex flex-col  pt-2 w-full max-w-xs h-48 overflow-y-auto sin-scrollbar border-b-2 border-red/20 ">
                {ingredients?.map((ingredient) => (
                <div key={ingredient.id} className={`border-t-2 border-red/20 transition p-1 ${selectedIngredients[0] === ingredient.slug
                        ? "bg-red/10"
                        : "hover:bg-gray-100"}`}>
                    <label  
                    key={ingredient.id}
                    className={`flex gap-1 items-center cursor-pointer `}>
                    <input
                    type="radio"
                    name="basic-ingredient"
                    checked={selectedIngredients.includes(ingredient.slug)}
                    onChange={() => setSelectedIngredients([ingredient.slug])}
                    className="hidden"
                    />
                    {/* círculo custom */}
                    <div
                        className={`
                        w-5 h-5 rounded-full border flex items-center justify-center
                        ${
                            selectedIngredients.includes(ingredient.slug)
                            ? "border-red"
                            : "border-ring"
                        }
                        `}
                    >
                        {selectedIngredients.includes(ingredient.slug) && (
                        <div className="w-3 h-3 rounded-full bg-red" />
                        )}
                    </div>
                    <p className=" font-gothic text-[clamp(1.2rem,2.5vw,1.4rem)]">{ingredient.name}</p>
                </label>
                </div>
                ))}
            </div>
        ) : (
        [{key: "sm", label: "Chica", subtotal: subtotalSm},
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
            )))}

            <div className="flex flex-col w-full max-w-xs mt-4">
                <div className="flex justify-between mb-2">
                <p className="font-gothic text-lg md:text-xl text-card-foreground">Subtotal: </p>
                <p className="font-medium text-red text-xl">{totalSubtotal.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                </div>
                <div  className="flex items-center justify-center mt-3">
                <Button 
                    onClick={() => handleAddToCart()}
                    disabled={!isValid}
                    className={`w-full h-12  transition duration-120 text-background text-lg font-medium
                    ${isValid ? "bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 cursor-pointer"
                        : "bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97"
                    }`}>
                    <p className="text-md md:text-lg">Agregar al carrito</p>
                </Button>
                </div>
            </div>
        </div>
    </div>

    </div>
    )
}