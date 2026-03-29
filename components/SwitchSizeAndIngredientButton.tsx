
interface SwitchSizeAndIngredientButtonProps {
    setShowIngredients: React.Dispatch<React.SetStateAction<boolean>>;
    showIngredients: boolean;
}

export default function SwitchSizeAndIngredientButton ({
    showIngredients,
    setShowIngredients
}: SwitchSizeAndIngredientButtonProps) {
    return (
        <div className="flex justify-center p-1 mb-4 border rounded-full border-amber-900">
        <button
            className={`px-4 py-2 w-1/2 rounded-full ${!showIngredients ? 'bg-red text-background' : 'bg-gray-200 text-card-foreground/70'} cursor-pointer`}
            onClick={() => setShowIngredients(false)}
        >
            Tamaños
        </button>
        <button
            className={`pl-4 pr-6 py-2 rounded-full w-1/2 ${showIngredients ? 'bg-red text-background' : 'bg-gray-200 text-card-foreground/70'} cursor-pointer`}
            onClick={() => setShowIngredients(true)}
        >
            Ingredientes
        </button>
        </div>
    )
}