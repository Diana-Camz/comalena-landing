import { Ingredient } from "@/types/types";

interface IngredientsListProps {
    ingredient: Ingredient;
    selectedIngredients: string[];
    setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    singleSelection?: boolean;
}

export default function IngredientsList({ 
    ingredient, 
    selectedIngredients, 
    setSelectedIngredients, 
    singleSelection = false
 }: IngredientsListProps) {
     const isSelected = selectedIngredients.includes(ingredient.slug);
    
     const handleSelectIngredient = () => {
        if (singleSelection) {
            setSelectedIngredients([ingredient.slug]);
            return;
        }
        setSelectedIngredients((prev) => 
            prev.includes(ingredient.slug) 
                ? prev.filter((item) => item !== ingredient.slug) 
                : [...prev, ingredient.slug]
        )
    }
    return (
        <div key={ingredient.id} className={`border-t-2 border-red/20 transition p-1 
            ${selectedIngredients.includes(ingredient.slug)
                        ? "bg-red/10"
                        : "hover:bg-gray-100"}`}>
                    <label  
                    key={ingredient.id}
                    className={`flex gap-1 items-center cursor-pointer `}>
                    <input
                    type={singleSelection ? "radio" : "checkbox"}
                    name={ singleSelection ? "basic-ingredient" : ingredient.slug }
                    checked={isSelected}
                    onChange={handleSelectIngredient}
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
                    <p className=" font-gothic text-[clamp(1.2rem,2.5vw,1.4rem)]">{ingredient.name}</p>
                </label>
                </div>
    )
}