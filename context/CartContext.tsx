"use client"

import React, { createContext, useContext, useState, useMemo } from "react"
import type { Size, OrderItem, CustomerInfo, Pizza } from "@/types/types";

type CartContextType = {
    order: OrderItem[];
    customerInfo: CustomerInfo;

    addItem: (pizza: Pizza, size: Size) => void;
    addOrderItem: (orderItem: OrderItem) => void;
    setQuantity: (pizzaId: string, size: Size, quantity: number) => void;
    removeItem: (pizzaId: string, size: Size) => void;
    clearCart: () => void;

    setCustomerField: (field: keyof CustomerInfo, value: string) => void;

    total: number;
    buildWhatsAppMessage: (phone: string) => string;
}

const CartContext = createContext<CartContextType | null>(null);

function makeKey(pizzaId: string, size: Size) {
  return `${pizzaId}:${size}`;
}

export function CartProvider({children} : {children : React.ReactNode}) {
    const [order, setOrder] = useState<OrderItem[]>([]);
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        name: "Diana",
        address: "Insurgentes Sur 1234, CDMX",
        phone: "31212545121",
        notes: "sin cebolla por favor"
    });

    //Funcion que Agrega pizza + tamaño, si ya existe, aumenta la cantidad, si no, la agrega al carrito
  const addItem = (pizza: Pizza, size: Size) => {
    const unitPrice = pizza.prices[size];

    setOrder((prev) => {
      const key = makeKey(pizza.id, size);
      const existing = prev.find((it) => makeKey(it.pizzaId, it.size) === key);

      if (existing) {
        return prev.map((it) =>
          makeKey(it.pizzaId, it.size) === key
            ? { ...it, quantity: it.quantity + 1 }
            : it
        );
      }

      return [
        ...prev,
        {
          pizzaId: pizza.id,
          title: pizza.title,
          size,
          unitPrice,
          quantity: 1,
        },
      ];
    });
  };

  //Funcion que agrega una orden completa de acuerdo a los tamanos seleccionados por cada tipo de pizza.
  const addOrderItem = (orderItem: OrderItem) => {
    setOrder((prev) => {
      const key = makeKey(orderItem.pizzaId, orderItem.size);
      const existing = prev.find((it) => makeKey(it.pizzaId, it.size) === key);

      if (existing) {
        return prev.map((it) =>
          makeKey(it.pizzaId, it.size) === key
            ? { ...it, quantity: it.quantity + orderItem.quantity }
            : it
        );
      }

      return [...prev, orderItem];
    });
  }

    //Funcion que cambia la cantidad, si qty <= 0, lo elimina.
  const setQuantity = (pizzaId: string, size: Size, qty: number) => {
    const key = makeKey(pizzaId, size);

    setOrder((prev) => {
      if (qty <= 0) return prev;;

      return prev.map((it) =>
        makeKey(it.pizzaId, it.size) === key ? { ...it, quantity: qty } : it
      );
    });
  };

  const removeItem = (pizzaId: string, size: Size) => {
    const key = makeKey(pizzaId, size);
    setOrder((prev) => prev.filter((it) => makeKey(it.pizzaId, it.size) !== key));
  }

  const setCustomerField = (field: keyof CustomerInfo, value: string) => {
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
        notes: ""
    });
  }

  const total = useMemo(() => {
    return order.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  }, [order]);

  //Funcion que va a construir el mensaje que sera enviado por WhatsApp
  const buildWhatsAppMessage = () => {
     const lines: string[] = [];

    lines.push("Hola! Quiero hacer una orden 🍕");
    if (customerInfo.name.trim()) lines.push(`Nombre: ${customerInfo.name.trim()}`);
    if (customerInfo.address.trim()) lines.push(`Domicilio: ${customerInfo.address.trim()}`);
    lines.push("");
    lines.push("Orden:");

    order.forEach((it, idx) => {
      lines.push(
        `${idx + 1}) ${it.title} (${it.size}) x${it.quantity} - $${it.unitPrice} c/u`
      );
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
    lines.push('Para confirmar, responde "CONFIRMO" ✅');

    const text = encodeURIComponent(lines.join("\n"));
    return `https://wa.me/523122703873?text=${text}`;

  }

    const value = {
        order,
        customerInfo,
        addItem,
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