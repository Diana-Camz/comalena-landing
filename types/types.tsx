export type Prices = {
    sm: number;
    md: number;
    lg: number; 
}
export type PizzaItem = {
    id: string;
    title: string;
    ingredients: string;
    imageUrl: string;
    prices: Prices;
    tags?: string[];
    selectedIngredients?: string[];
}

export type ComplementItem = {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    prices: Prices,
    tags?: string[];
}

//este tipo de types son para agregarse al carrito, ya que no necesita toda la info de la pizza
export type Pizza = {
    id: string;
    title: string;
    prices: Prices;
}

export type Complement = {
    id: string;
    name: string;
    price: Prices;
}

export type Size = "sm" | "md" | "lg";


export type PizzaForModal = {
    pizzaId: string;
    title: string;
    prices: Prices;
    ingredientMode?: "single" | "multiple";
}

export type ComplementForModal = {
    complementId: string;
    title: string;
    prices: Prices;
}

export type OrderItem = {
    itemId: string;
    title: string;
    itemType: "pizza" | "complement";
    size: Size;
    unitPrice: number;
    quantity: number;
    selectedIngredients?: string[];
}

export type CustomerInfo = {
    name: string;
    address: string;
    phone: string;
    notes?: string;
    isPickup: boolean;
    acceptedPrivacy: boolean;
}