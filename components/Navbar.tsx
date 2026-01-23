"use client";
import Image from "next/image";
import Link from "next/link";


export default function Navbar () {
    const navLabels = [
        {label: 'Inicio', href: '/'},
        {label: 'Menu', href: '/menu'},
        {label: 'Galeria', href: '/galery'},
        {label: 'Nosotros', href: '/aboutUs'},
        {label: 'Contacto', href: '/contact'},
    ];
    return (
        <div className="sticky m-4 top-0 z-50 shadow-md shadow-gray-100  items-center bg-background rounded-lg">
            <div className="flex justify-start items-end w-3/4 lg:px-4 lg:py-2 gap-4 sm:gap-10 lg:gap-24">
               <Link href="/">
                 <Image src="/images/logo.png" alt="Logo Comaleña Pizza" width={80} height={50}/>
               </Link>
               <nav className="flex justify-start gap-28">
                {navLabels.map((navItem) => (
                    <Link key={navItem.href}
                    href={navItem.href}
                    className="relative font-ghotic pb-2 text-4xl text-card-foreground/70
                        after:absolute after:left-0 after:bottom-0
                        after:h-[5px] after:w-full after:bg-secondary
                        after:origin-left after:scale-x-0 after:transition-transform after:duration-300
                        hover:after:scale-x-100 hover:text-card-foreground focus:text-card-foreground
                        active:after:scale-x-100 active:text-card-foreground "
                    >
                        {navItem.label}
                    </Link>
                ))}
               </nav>
            </div>
        </div>
    )
}