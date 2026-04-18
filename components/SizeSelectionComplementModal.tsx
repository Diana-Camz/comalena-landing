import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { ComplementForModal, ComplementSize } from "@/types/types";


interface SizeSelectionComplementModalProps {
    activeComplement: ComplementForModal | null;
    setActiveComplementSelection: (value: ComplementForModal | null) => void;
    selectedComplementSizes: Record<ComplementSize, number>;
    setSelectedComplementSizes: React.Dispatch<React.SetStateAction<Record<ComplementSize, number>>>;
    handleAddToCart: () => void;
}

export default function SizeSelectionComplementModal({
    activeComplement,
    setActiveComplementSelection,
    selectedComplementSizes,
    setSelectedComplementSizes,
    handleAddToCart,
}: SizeSelectionComplementModalProps) {

    const COMPLEMENT_SIZE_LABELS: Record<string, string> = {
        sm: "Chico",
        md: "Mediano",
        lg: "Grande",
        unit: "unidades",
    };

    const complementsWithSize = activeComplement?.complementId === "comp-1" || activeComplement?.complementId === "comp-5"

    const hasItems =
    (selectedComplementSizes.sm ?? 0) > 0 ||
    (selectedComplementSizes.md ?? 0) > 0 ||
    (selectedComplementSizes.lg ?? 0) > 0 ||
    (selectedComplementSizes.unit ?? 0) > 0;


    const totalSubtotal = Object.entries(activeComplement?.prices || {}).reduce(
    (acc, [key, price]) => {
        const qty = selectedComplementSizes[key as ComplementSize] ?? 0;
    return acc + qty * price;
  },
  0
);

    const isValid = hasItems;

    const increase = (key: ComplementSize) => {
        setSelectedComplementSizes((prev) => ({
            ...prev,
            [key]: (prev[key] ?? 0) + 1,
        }));
        };
    
        const decrease = (key: ComplementSize) => {
        setSelectedComplementSizes((prev) => ({
            ...prev,
            [key]: Math.max(0, (prev[key] ?? 0) - 1),
        }));
        };
    return (
        <div 
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 sm:p-4"
    onClick={() => {setActiveComplementSelection(null)}}>
    <div
        className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-lg p-4 rounded-2xl bg-input sm:p-6 md:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
    >
    <div className="flex justify-end mb-2">
        <button
        type="button"
        onClick={() => {setActiveComplementSelection(null); setSelectedComplementSizes({sm: 0, md: 0, lg: 0, unit: 0})}}
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
        { complementsWithSize
              ? "Selecciona el tamaño de tu complemento"
              : "Selecciona las unidades"
        }
    </h3>
    <p className=" text-lg md:text-xl text-center font-medium text-card-foreground mb-4">{activeComplement?.title}</p>
    <div className="flex flex-col items-center gap-2">
        {Object.entries(activeComplement?.prices ?? {}).map(([key, price]) => {
            const quantity = selectedComplementSizes[key as ComplementSize] ?? 0;
            const subtotal = quantity * price;
            const label = COMPLEMENT_SIZE_LABELS[key] || key;
            return (
                <div key={key} className="flex items-center gap-4 border-b-2 border-red/20 py-2 w-full max-w-xs"> 
                    <button 
                    onClick={() => decrease(key as ComplementSize)}
                    className="cursor-pointer">
                        <CiCircleMinus className="w-10 h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background "/>
                    </button>
                    <p className="font-medium w-4 text-center">{quantity}</p>
                    <button 
                    onClick={() => increase(key as ComplementSize)}
                    className="cursor-pointer">
                        <CiCirclePlus className="w-10 h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background"/>
                    </button>
                    <div className="flex justify-between w-44 items-center">
                        <p className=" font-gothic text-[clamp(1.2rem,2.5vw,1.4rem)]">{label}</p>
                        <p className="font-medium text-card-foreground/80"> = {subtotal?.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                    </div>
                </div>
            )
        })}
   

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