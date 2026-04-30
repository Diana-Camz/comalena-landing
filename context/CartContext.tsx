"use client"

import React, { createContext, useContext, useState, useMemo, useEffect } from "react"
import type { AnySize, OrderItem, CustomerInfo } from "@/types/types";
import { ingredients, pizzaMenu } from "@/data/data";

type CartContextType = {
    phone: string;
    order: OrderItem[];
    customerInfo: CustomerInfo;
    total: number;
    addOrderItem: (orderItem: OrderItem) => void;
    setQuantity: (pizzaId: string, size: AnySize, quantity: number, selectedIngredients: string[]) => void;
    removeItem: (pizzaId: string, size: AnySize, selectedIngredients: string[]) => void;
    clearCart: () => void;

    setCustomerField: <K extends keyof CustomerInfo>(field: K, value: CustomerInfo[K]) => void;

    buildWhatsAppMessage: (paymentId?: string) => string;
}

const CartContext = createContext<CartContextType | null>(null);

function makeKey(itemId: string, size: AnySize, ingredients: string[] = [], selectedPizzas: string[] = []) {
  return `${itemId}-${size}-${ingredients.slice().sort().join("-")}-${selectedPizzas.slice().sort().join("-")}`;
}

export function CartProvider({children} : {children : React.ReactNode}) {
    const phone = "523121096301";
    const getInitialCustomer = (): CustomerInfo => ({
      name: "",
      address: "",
      phone: "",
      notes: "",
      isPickup: false,
      acceptedPrivacy: false,
    });
    const [order, setOrder] = useState<OrderItem[]>(() => {
      if (typeof window === "undefined") return [];
      const savedOrder = localStorage.getItem("pendingOrder");
      if (!savedOrder) return [];
      try {
        return JSON.parse(savedOrder) as OrderItem[];
      } catch {
        return [];
      }
    });
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
        if (typeof window === "undefined") {
            return getInitialCustomer();
        }

        const savedCustomer = localStorage.getItem("customerInfo");
        if (!savedCustomer) return getInitialCustomer();
        try {
          return JSON.parse(savedCustomer) as CustomerInfo;
        } catch {
          return getInitialCustomer();
        }
    });

  useEffect(() => {
  localStorage.setItem("pendingOrder", JSON.stringify(order));
}, [order]);

useEffect(() => {
  localStorage.setItem("pendingCustomerInfo", JSON.stringify(customerInfo));
}, [customerInfo]);

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
    localStorage.removeItem("orderPending");
    localStorage.removeItem("customerInfo");
  }

  const total = useMemo(() => {
    return order.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  }, [order]);

  //Funcion que va a construir el mensaje que sera enviado por WhatsApp
  const buildWhatsAppMessage = (paymentId?: string): string => {
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
    if (paymentId)  lines.push('Pagado con Stripe');
    if (!paymentId) lines.push('Pago aún no realizado');
    if (paymentId) lines.push("ID de mi pago: " + paymentId);
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
    if (paymentId) lines.push('Quedo en espera de la confirmación de mi pedido, el tiempo de preparación y el costo del envío a domicilio (en caso de aplicar)');
    if (!paymentId) lines.push('Quedo en espera de la confirmación de mi pedido, el tiempo de preparación y el total a pagar con el envío a domicilio (en caso de aplicar)');

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/${phone}?text=${text}`;

  }

    const value = {
        phone,
        order,
        customerInfo,
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