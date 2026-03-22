export type Prices = {
    sm: number;
    md: number;
    lg: number; 
}
export type PizzaItem = {
    id: number;
    title: string;
    ingredients: string;
    imageUrl: string;
    prices: Prices;
    tags?: string[];
}

export type Pizza = {
    id: string;
    title: string;
    prices: Prices;
}

export type Size = "sm" | "md" | "lg";


export type PizzaForModal = {
     pizzaId: string;
    title: string;
    prices: Prices;
}

export type OrderItem = {
    pizzaId: string;
    title: string;
    size: Size;
    unitPrice: number;
    quantity: number;
}

export type CustomerInfo = {
    name: string;
    address: string;
    phone: string;
    notes?: string;
}