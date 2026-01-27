"use client";
import Image from "next/image";
import Link from "next/link";
import { IoMenuSharp } from "react-icons/io5";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";


type NavItem = { href: string; label: string };
export default function Navbar ({ navLabels }: { navLabels: NavItem[] }) {

    return (
        <header className="sticky top-0 z-50 px-4 md:px-0">
            <div className="flex max-[900px]:justify-between max-[900px]:pr-4 items-center mx-auto max-w-6xl md:max-w-none md:mx-6 rounded-lg bg-background shadow-md shadow-gray-100 border-2">
              <div className="flex items-center justify-between px-4 py-3 md:py-2">
                <Link href="/" className="shrink-0">
                 <Image 
                    src="/images/logo.png" 
                    alt="Logo Comaleña Pizza" 
                    width={90} height={56} 
                    className="h-auto w-[72px] md:w-[84px] lg:w-[96px]" 
                    priority
                />
                </Link>
              </div>
               <nav className="hidden min-[900px]:flex items-center md:gap-16 lg:gap-20 md:ml-4 lg:ml-8 ">
                {navLabels.map((navItem) => (
                    <Link key={navItem.href}
                    href={navItem.href}
                    className="
                        relative inline-flex items-center font-ghotic pb-2 text-xl max-[1119px]:text-3xl min-[1120px]:text-4xl
                        text-card-foreground/70
                        after:absolute 
                        after:left-0 
                        after:bottom-0
                        after:h-[5px] 
                        after:w-full 
                        after:bg-secondary
                        after:origin-left 
                        after:scale-x-0 
                        after:transition-transform 
                        after:duration-300
                        hover:after:scale-x-100 
                        hover:text-card-foreground 
                        focus:text-card-foreground
                        active:after:scale-x-100 
                        active:text-card-foreground"
                    >
                        {navItem.label}
                    </Link>
                ))}
               </nav>
            <div className="min-[900px]:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button type="button" className=" cursor-pointer border-1 rounded-sm text-card-foreground">
                  <IoMenuSharp size={30}/>
                </button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72">
                <nav className="mt-10 flex flex-col gap-6">
                  {navLabels.map((navItem) => (
                    <Link
                      key={navItem.href}
                      href={navItem.href}
                      className="text-2xl text-card-foreground/70 pl-6"
                    >
                      {navItem.label}
                    </Link>
                  ))}
                </nav>

                <div className="flex mt-10 justify-center items-center">
                    <a
                    href="https://wa.me/523122703873"
                    target="_blank"
                    className=" inline-flex w-3/4 mx-1 items-center justify-center rounded-full bg-secondary/70 px-6 py-3 text-input font-medium hover:opacity-90 transition"
                    >
                    Ordenar por WhatsApp
                    </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        </header>
    )
}
