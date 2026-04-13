import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Ingredient, PizzaForModal, PizzaSize, SizePrices } from "@/types/types";
import { useState } from "react";
import { ingredients, pizzaMenu } from "@/data/data";
import IngredientsList from "./IngredientsList";
import PizzaList from "./PizzaList";
import SwitchButton from "./SwitchButton";

interface SizeSelectionPizzaModalProps {
  activeSizeSelection: PizzaForModal | null;
  setActiveSizeSelection: (value: PizzaForModal | null) => void;
  selectedSize: SizePrices;
  setSelectedSize: React.Dispatch<React.SetStateAction<SizePrices>>;
  selectedIngredients: string[];
  selectedPizzas: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedPizzas: React.Dispatch<React.SetStateAction<string[]>>;
  pricesForHalfPizza: SizePrices;
  arrSelectedIngredients: Ingredient[];
  handleAddToCart: () => void;
}

export default function SizeSelectionPizzaModal({
    activeSizeSelection,
    setActiveSizeSelection,
    selectedSize,
    setSelectedSize,
    selectedIngredients,
    setSelectedIngredients,
    selectedPizzas,
    setSelectedPizzas,
    pricesForHalfPizza,
    arrSelectedIngredients,
    handleAddToCart,

}: SizeSelectionPizzaModalProps) {
    
    const [showList, setShowList] = useState(false);
    const excludedPizzaIds = ["pizza-1", "pizza-2", "pizza-3"];
    const excludedIngredients = ["boneless-bbq", "boneless-bufalo"]
    const isBasicPizza = activeSizeSelection?.pizzaId === "pizza-1"
    const isHalfPizza = activeSizeSelection?.pizzaId === "pizza-2"
    const isCustomPizza = activeSizeSelection?.pizzaId === "pizza-3";
    const pricesForCustomPizza = arrSelectedIngredients.reduce((acc, ingredient) => {
        return (
            acc +
            (selectedSize.sm * ingredient.price.sm) +
            (selectedSize.md * ingredient.price.md) +
            (selectedSize.lg * ingredient.price.lg)
        );
    }, 0);
    

    const subtotalSm = selectedSize.sm * pricesForHalfPizza.sm

    const subtotalMd = selectedSize.md * pricesForHalfPizza.md

    const subtotalLg = selectedSize.lg * pricesForHalfPizza.lg

    const totalSubtotal = subtotalSm + subtotalMd + subtotalLg + (!isBasicPizza ? pricesForCustomPizza : 0);

    const pizzaSizes = isHalfPizza 
        ? [
            {key: "md", label: "Mediana", subtotal: subtotalMd},
            {key: "lg", label: "Grande", subtotal: subtotalLg}
            ]
        :  [{key: "sm", label: "Chica", subtotal: subtotalSm},
            {key: "md", label: "Mediana", subtotal: subtotalMd},
            {key: "lg", label: "Grande", subtotal: subtotalLg}
            ]

    const hasItems =
    selectedSize.sm > 0 ||
    selectedSize.md > 0 ||
    selectedSize.lg > 0;



    const isValid = isHalfPizza 
        ? hasItems && selectedPizzas.length === 2 
        : ( isBasicPizza || isCustomPizza ) 
            ? hasItems && (selectedIngredients.length > 0) 
            : hasItems;

    const increase = (size: PizzaSize) => {
    setSelectedSize((prev) => ({
        ...prev,
        [size]: prev[size] + 1,
    }));
    };

    const decrease = (size: PizzaSize) => {
    setSelectedSize((prev) => ({
        ...prev,
        [size]: Math.max(0, prev[size] - 1),
    }));
    };

    const resetData = () => {
        setActiveSizeSelection(null); 
        setShowList(false); 
        setSelectedIngredients([]); 
        setSelectedPizzas([]); 
        setSelectedSize({sm: 0, md: 0, lg: 0})
    }

    return (
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
    onClick={() => resetData()}>
    <div
        className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-lg p-4 md:p-0 rounded-2xl bg-input sm:p-6 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
    >
    <div className="flex justify-end mb-2">
        <button
        type="button"
        onClick={() => resetData()}
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
    <h3 className="text-[clamp(1.2rem,2.5vw,2rem)] text-red font-gothic mb-2 text-center leading-tight">
        {isBasicPizza 
            ?`Selecciona el ${!showList ? "tamaño" : "ingrediente"} de tu pizza`
            : isHalfPizza
                ? `Selecciona ${!showList ? "el tamaño de tu pizza" : "tus 2 pizzas favoritas"}`
                : `Elige ${!showList ? "el tamaño de tu pizza" : `tus ingredientes ${!isCustomPizza ? "extra favoritos" : ""}`}`}
    </h3>
    <div className="flex flex-col items-center gap-2">
        <p className=" text-lg md:text-xl font-medium text-card-foreground mb-4">{activeSizeSelection?.title}</p>
            {!isHalfPizza &&(<div>
                <SwitchButton 
                setShowList={setShowList} 
                showList={showList}
                secondLabel="Ingredientes"
                />
            </div>)}
        {isHalfPizza && (
            <div>
                <SwitchButton 
                setShowList={setShowList} 
                showList={showList}
                secondLabel="Pizzas"
                />
            </div>
        )}  
        {showList ? (
            <div className="flex flex-col  pt-2 w-full max-w-xs h-48 overflow-y-auto sin-scrollbar border-b-2 border-red/20 ">
                {isHalfPizza ? (
                    <div> 
                    {pizzaMenu?.filter((pizza) => !excludedPizzaIds.includes(pizza.id))
                    .map((pizza) => (
                         <PizzaList
                            key={pizza.id}
                            pizza={pizza}
                            selectedPizzas={selectedPizzas}
                            setSelectedPizzas={setSelectedPizzas}
                        />)
                        )
                    }
                    </div>
                ) : (
                    <div> 
                    {isBasicPizza ?
                        (ingredients?.filter((ingredient) => !excludedIngredients.includes(ingredient.slug))
                        .map((ingredient) => (
                            <IngredientsList
                                key={ingredient.id}
                                ingredient={ingredient}
                                selectedIngredients={selectedIngredients}
                                setSelectedIngredients={setSelectedIngredients}
                                singleSelection={isBasicPizza}
                            />
                            ))
                        ) : (ingredients?.map((ingredient) => (
                            <IngredientsList
                                key={ingredient.id}
                                ingredient={ingredient}
                                selectedIngredients={selectedIngredients}
                                setSelectedIngredients={setSelectedIngredients}
                                singleSelection={isBasicPizza}
                            />
                            ))
                        )}
                    </div>
                )}
                
            </div>
        ) : (
        pizzaSizes.map(({key, label, subtotal}) => (
            <div key={key} className="flex items-center gap-4 border-b-2 border-red/20 py-2 w-full max-w-xs"> 
                <button 
                onClick={() => decrease(key as PizzaSize)}
                className="cursor-pointer">
                    <CiCircleMinus className="w-10 h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background "/>
                </button>
                <p className="font-medium w-4 text-center">{selectedSize[key as PizzaSize]}</p>
                <button 
                onClick={() => increase(key as PizzaSize)}
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