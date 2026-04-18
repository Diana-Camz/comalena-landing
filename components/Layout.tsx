'use client';
import Image from "next/image";
import { useState } from "react";
import FloatOrderButton  from "./FloatOrderButton";
import OrderSheet from "./OrderSheet";

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout ({children}: LayoutProps) {
    const [active, setActive] = useState(false);
    return (
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            {children}
            {active && <OrderSheet setActive={setActive}/>}
            <div className="fixed bottom-6 right-4 z-50">
                <FloatOrderButton active={active} setActive={setActive} />
                <a href="https://wa.me/523122703873" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/whatsapp-icon.svg" alt="WhatsApp"  width={58} height={58} className="hover:scale-105 transition-transform cursor-pointer"/>
                </a>
            </div>
        </div>
    )
}