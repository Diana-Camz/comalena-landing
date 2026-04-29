"use client"
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

type ButtonProps = {
    active: boolean;
    setActive : (active: boolean) => void;
}

export default function FloatOrderButton({active, setActive}: ButtonProps) {
    const [mounted, setMounted] = useState(false)
    const {order} = useCart();

    useEffect(() => {
        setMounted(true)
    }, []);

    const totalItems = order.reduce((total, sm) => total + sm.quantity, 0)
    
    return (
        <div>
            <button onClick={() => setActive(!active)} className="border-2 rounded-lg border-card-foreground/30 hover:scale-105 transition-transform cursor-pointer mb-2 active:scale-95 duration-120 bg-orange-100">
            {active ? (
                <a>
                    <Image src="/images/pizza-box.png" alt="Close" width={56} height={56}/>
                </a>
            ) : (
                <a>
                    <Image src="/images/pizza-box-closed.png" alt="Open" width={56} height={56}/>
                </a>
            )}
        </button>
        {mounted && totalItems > 0 && (
            <div className="absolute -top-1 -right-1 bg-red/95 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-normal">
                <p>{totalItems}</p>
            </div>
        )}
        </div>

    )
}