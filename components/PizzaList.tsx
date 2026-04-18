import { Pizza } from "@/types/types";

interface PizzaListProps {
    pizza: Pizza;
    selectedPizzas: string[];
    setSelectedPizzas: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function PizzaList({ 
    pizza, 
    selectedPizzas, 
    setSelectedPizzas,
}: PizzaListProps) {
    const isSelected = selectedPizzas.includes(pizza.id);


    const handleSelectPizzas = () => {
        setSelectedPizzas((prev) => {
            if(prev.includes(pizza.id)){
                return prev.filter((item) => item !== pizza.id)
            }
            if(prev.length >= 2){
                return prev;
            }
            return [...prev, pizza.id]
        });
    }

    return (
        <div key={pizza.id} className={`border-t-2 border-red/20 transition p-1 ${isSelected
                        ? "bg-red/10"
                        : "hover:bg-gray-100"}`}>
            <label  
            key={pizza.id}
            className={`flex gap-1 items-center cursor-pointer `}>
            <input
            type="checkbox"
            name={pizza.id}
            checked={isSelected}
            onChange={handleSelectPizzas}
            className="hidden"
            />
            {/* círculo custom */}
            <div
                className={`
                w-5 h-5 rounded-full border flex items-center justify-center
                ${
                    isSelected
                    ? "border-red"
                    : "border-ring"
                }
                `}
            >
                {isSelected && (
                <div className="w-3 h-3 rounded-full bg-red" />
                )}
            </div>
            <div className="flex w-full items-center justify-between">
                <p className=" font-gothic text-[clamp(1.2rem,2.5vw,1.4rem)]">{pizza.title}</p>
            </div>
            </label>
        </div>
    )
}