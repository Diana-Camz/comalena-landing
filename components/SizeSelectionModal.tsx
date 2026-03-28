import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { PizzaForModal, Size } from "@/types/types";

interface SizeSelectionModalProps {
  activeSizeSelection: PizzaForModal | null;
  setActiveSizeSelection: (value: PizzaForModal | null) => void;
  selectedSize: { sm: number; md: number; lg: number };
  setSelectedSize: React.Dispatch<React.SetStateAction<{ sm: number; md: number; lg: number }>>;
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
    handleAddToCart,
    subtotalSm,
    subtotalMd,
    subtotalLg,
    totalSubtotal }: SizeSelectionModalProps) {

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
    )
}