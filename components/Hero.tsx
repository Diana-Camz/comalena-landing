'use client';
import Image from "next/image";

export function Hero () {
    return (
        <div className="max-h-[350px]">
            <Image src="/images/hero3.jpg" alt="Hero Image Comaleña Pizza" width={2000} height={100} objectFit="cover" className="rounded-4xl overflow-hidden"/>
        </div>
    )
}