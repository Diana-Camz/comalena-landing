"use client"

import React, { createContext, useContext, useState, useMemo } from "react"
import type { AnySize, OrderItem, CustomerInfo } from "@/types/types";
import { ingredients, pizzaMenu } from "@/data/data";

type CartContextType = {
    order: OrderItem[];
    customerInfo: CustomerInfo;
    total: number;
    //addItem: (pizza: Pizza, size: Size) => void;
    addOrderItem: (orderItem: OrderItem) => void;
    setQuantity: (pizzaId: string, size: AnySize, quantity: number, selectedIngredients: string[]) => void;
    removeItem: (pizzaId: string, size: AnySize, selectedIngredients: string[]) => void;
    clearCart: () => void;

    setCustomerField: <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => void;

    buildWhatsAppMessage: (phone: string) => string;
}

const CartContext = createContext<CartContextType | null>(null);

function makeKey(itemId: string, size: AnySize, ingredients: string[] = [], selectedPizzas: string[] = []) {
  return `${itemId}-${size}-${ingredients.slice().sort().join("-")}-${selectedPizzas.slice().sort().join("-")}`;
}

export function CartProvider({children} : {children : React.ReactNode}) {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: "",
        address: "",
        phone: "",
        notes: "",
        isPickup: false,
        acceptedPrivacy: false
    });

    //Funcion que Agrega pizza + tamaño, si ya existe, aumenta la cantidad, si no, la agrega al carrito
  // const addItem = (pizza: Pizza, size: Size) => {
  //   const unitPrice = pizza.prices[size];

  //   setOrder((prev) => {
  //     const key = makeKey(pizza.id, size);
  //     const existing = prev.find((it) => makeKey(it.itemId, it.size) === key);

  //     if (existing) {
  //       return prev.map((it) =>
  //         makeKey(it.itemId, it.size) === key
  //           ? { ...it, quantity: it.quantity + 1 }
  //           : it
  //       );
  //     }

  //     return [
  //       ...prev,
  //       {
  //         pizzaId: pizza.id,
  //         title: pizza.title,
  //         size,
  //         unitPrice,
  //         quantity: 1,
  //       },
  //     ];
  //   });
  // };

  //Funcion que agrega una orden completa de acuerdo a los tamanos seleccionados por cada tipo de pizza.
  const addOrderItem = (orderItem: OrderItem) => {
    setOrder((prev) => {
      const key = makeKey(orderItem.itemId, orderItem.size, orderItem?.selectedIngredients, orderItem?.selectedPizzas);
      const existing = prev.find((it) => makeKey(it.itemId, it.size, it.selectedIngredients, it.selectedPizzas) === key);

      if (existing) {
        return prev.map((it) =>
          makeKey(it.itemId, it.size, it.selectedIngredients, it.selectedPizzas) === key
            ? { ...it, quantity: it.quantity + orderItem.quantity }
            : it
        );
      }

      return [...prev, orderItem];
    });
  }

    //Funcion que cambia la cantidad, si qty <= 0, lo elimina.
  const setQuantity = (pizzaId: string, size: AnySize, qty: number, selectedIngredients: string[]= [], selectedPizzas: string[]= []) => {
    const key = makeKey(pizzaId, size, selectedIngredients, selectedPizzas);

    setOrder((prev) => {
      if (qty <= 0) return prev;;

      return prev.map((it) =>
        makeKey(it.itemId, it.size, it.selectedIngredients) === key ? { ...it, quantity: qty } : it
      );
    });
  };

  const removeItem = (pizzaId: string, size: AnySize, selectedIngredients: string[]= [], selectedPizzas: string[] = []) => {
    const key = makeKey(pizzaId, size, selectedIngredients, selectedPizzas);
    setOrder((prev) => prev.filter((it) => makeKey(it.itemId, it.size, it.selectedIngredients, it.selectedPizzas) !== key));
  }

  const setCustomerField = <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => {
    setCustomerInfo((prev) => ({
        ... prev,
        [field]: value
    }))
  }

  const clearCart = () => {
    setOrder([]);
    setCustomerInfo({
        name: "",
        address: "",
        phone: "",
        notes: "",
        isPickup: false,
        acceptedPrivacy: false
    });
  }

  const total = useMemo(() => {
    return order.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  }, [order]);

  //Funcion que va a construir el mensaje que sera enviado por WhatsApp
  const buildWhatsAppMessage = (phone:string): string => {
    const lines: string[] = [];
    const sizesLabel = [
                          {key: "sm", label: "Chica"},
                          {key: "md", label: "Mediana"},
                          {key: "lg", label: "Grande"},
                          {key: "unit", label: ""}
                        ];
    

    lines.push("Hola! Quiero hacer una orden");
    if (customerInfo.name.trim()) lines.push(`Nombre: ${customerInfo.name.trim()}`) ;
    if (customerInfo.phone.trim()) lines.push(`Teléfono: ${customerInfo.phone.trim()}`);
    if (customerInfo.address.trim()) lines.push(`Domicilio: ${customerInfo.address.trim()}`);
    lines.push("");
    lines.push("Orden:");

    order.forEach((it, idx) => {
    const sizeLabel = sizesLabel.find(s => s.key === it.size)?.label ?? it.size;
    const ingredientsTitles = ingredients.filter((ingredient) => it.selectedIngredients?.includes(ingredient.slug)).map(ing => ing.name);
    const pizzasTitles = pizzaMenu.filter((pizza) => it.selectedPizzas?.includes(pizza.id)).map(p => p.title);
      if(it.itemId === "pizza-1"){
        lines.push( `${idx + 1}) ${it.title} (${sizeLabel}) de: ${ingredientsTitles.join(", ")} x${it.quantity} = $${it.quantity * it.unitPrice}`)
      } else if(it.itemId === "pizza-2"){
         lines.push( `${idx + 1}) ${it.title} (${sizeLabel}) de: ${pizzasTitles[0]} y ${pizzasTitles[1]} x${it.quantity} = $${it.quantity * it.unitPrice}`)
      } else {
        lines.push(`${idx + 1}) ${it.title} (${sizeLabel}) x${it.quantity} = $${it.quantity * it.unitPrice}`);
        if(it.selectedIngredients && it.selectedIngredients?.length > 0 ){
        lines.push(`     + Ingredientes extra:  ${ingredientsTitles.join(", ")}`)
        }
      }
      
    });

    lines.push("");
    lines.push(`Total estimado: $${total}`);

    if (customerInfo.notes?.trim()) {
      lines.push("");
      lines.push(`Notas: ${customerInfo.notes.trim()}`);
    }else{
        lines.push("");
    }

    lines.push("");
    lines.push('Quedo en espera de la confirmación de mi pedido, el tiempo de preparación y el total con envío a domicilio (en caso de aplicar)');

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${phone}?text=${text}`;

  }

    const value = {
        order,
        customerInfo,
        //addItem,
        addOrderItem,
        setQuantity,
        removeItem,
        clearCart,
        setCustomerField,
        total,
        buildWhatsAppMessage
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}