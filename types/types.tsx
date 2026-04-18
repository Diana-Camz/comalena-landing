export type SizePrices = {
    sm: number;
    md: number;
    lg: number;
}

type UnitPrice = {
    unit: number;
}

export type Prices = SizePrices | UnitPrice;

export type PizzaItem = {
    id: string;
    title: string;
    ingredients: string;
    imageUrl: string;
    prices: SizePrices;
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
    prices: SizePrices;
}

export type Ingredient = {
  id: string;
  name: string;
  slug: string;
  type: string;
  price: SizePrices;
};

export type Complement = {
    id: string;
    name: string;
    price: Prices;
}

export type PizzaSize = "sm" | "md" | "lg";
export type ComplementSize = "sm" | "md" | "lg" | "unit";

export type AnySize = PizzaSize | ComplementSize;


export type PizzaForModal = {
    pizzaId: string;
    title: string;
    prices: SizePrices;
    ingredientMode?: "single" | "multiple";
}

export type ComplementForModal = {
    complementId: string;
    title: string;
    prices: Prices;
}

export type PizzaOrderItem = {
    itemId: string;
    title: string;
    itemType: "pizza";
    size: PizzaSize;
    unitPrice: number;
    quantity: number;
    selectedIngredients?: string[];
    selectedPizzas?: string[];
}

export type ComplementOrderItem = {
    itemId: string;
    title: string;
    itemType: "complement";
    size: ComplementSize;
    unitPrice: number;
    quantity: number;
    selectedIngredients?: string[];
    selectedPizzas?: string[];
}
export type OrderItem = PizzaOrderItem | ComplementOrderItem;

export type CustomerInfo = {
    name: string;
    address: string;
    phone: string;
    notes?: string;
    isPickup: boolean;
    acceptedPrivacy: boolean;
}