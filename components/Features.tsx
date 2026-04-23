import { Button } from "@/components/ui/button"
import Image from "next/image"
import FeatCard from "./FeatCard"
import TestimonialCard from "./TestimonialCard"
import Reveal from "@/components/Reveal";
import {FeatCarousel} from "./FeatCarousel";
import Link from "next/link"
import { featuredPizzas, testimonials } from "@/data/data";

export default function Features() {
    return (
        <div>
            <Reveal className="text-center mt-10"> {/* Presentacion de Comalena */}
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-red">CONOCE EL SABOR DE COMALEÑA</h2>
                { 
                    <div  className="flex gap-4 items-center justify-center mt-5 md:mt-15 min-[900px]:hidden">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link href="/menu" className="text-md md:text-lg">Quiero ordenar una pizza</Link>
                        </Button>
                    </div>
                }
            </Reveal>
            <Reveal className="flex flex-col min-[1560px]:flex-row xl:px-20 items-center mt-8 md:mt-12 lg:mt-30 min-[1560px]:mt-40">
               <div className=' lg:mt-0 lg:mx-0 min-[1560px]:mr-8'>
                 <p className="
                 text-[clamp(1.05rem,2.6vw,2.2rem)]
                 text-center min-[1560px]:text-justify
                 text-card-foreground/70 font-gothic
                 lg:mb-6 tracking-wide leading-snug">
                    En Comaleña preparamos <span className="font-bold">pizza artesanal al horno</span>, con <span className="font-bold">ingredientes frescos</span>,
                    <span className="font-bold"> masa hecha en casa</span> y recetas que resaltan el sabor auténtico en cada rebanada.
                </p>
                <p className="
                 mt-3
                 text-[clamp(1.05rem,2.6vw,2.2rem)]
                 text-center min-[1560px]:text-justify
                 text-card-foreground/70 font-gothic
                 lg:mb-6 tracking-wide leading-snug">
                    Cada pizza se hornea al momento para lograr una textura crujiente y un sabor inigualable.
                </p>
               </div>
               <div className=" mx-auto mt-5
                    relative shrink-0 overflow-hidden rounded-xl shadow-lg
                    w-full max-w-[400px] sm:max-w-[520px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]
                    aspect-[16/9] min-[1560px]:mt-0 min-[1560px]:ml-8
                ">
                <Image src='/images/hero2.jpg' alt='Pizza Comalena'  fill sizes="(max-width: 640px) 260px, (max-width: 768px) 420px, (max-width: 1024px) 520px, 900px" className="object-cover rounded-xl shadow-lg "/>
               </div>
            </Reveal>
            <Reveal className="mb-12 mt-18 lg:mt-30 min-[1560px]:mt-40"> {/* Las pizzas mas pedidas */}
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl md:text-6xl text-secondary/60 ">Las más pedidas</h2>
                    <p className="lg:mt-2 lg:text-3xl text-lg sm:text-xl md:text-2xl mb-4 md:mb-10 lg:mb-12 text-card-foreground/50 font-gothic">Ingredientes frescos y recetas que conquistan desde la primera rebanada.</p>
                </div>
                <div className="lg:mt-12">
                    <div className="hidden min-[760px]:grid gap-6 grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 ">
                        {featuredPizzas.map((pizza) => (
                            <FeatCard
                            key={pizza.id}
                            title={pizza.title}
                            description={pizza.description}
                            imageUrl={pizza.imageUrl}
                            price={pizza.price}
                            />
                        ))}
                    </div>
                    <div className="min-[760px]:hidden">
                        <FeatCarousel />
                    </div>
                    <div  className="flex gap-4 items-center justify-center mt-10 lg:mt-24">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link href="/menu" className="text-md md:text-lg">Ver Menú Completo</Link>
                        </Button>
                    </div>
                </div>
            </Reveal>
            <Reveal className="mb-4 mt-18 lg:mt-30 min-[1560px]:mt-40"> {/* Testimonios de clientes */}
                <div className="text-center">
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl md:text-6xl text-secondary/60">Opiniones de nuestros clientes</h2>
                </div>
                <div className="mt-8 lg:mt-12">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                        {testimonials.map((testimonial) => (
                            <TestimonialCard
                            key={testimonial.id}
                            client={testimonial.client}
                            testimonial={testimonial.testimonial}
                            date={testimonial.date}
                            rate={testimonial.rate}
                            />
                        ))}
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-24">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link className="text-md lg:text-lg" href="https://www.google.com/maps/place/Comale%C3%B1a+Pizza/@19.3268478,-103.7657404,17z/data=!4m8!3m7!1s0x8425457c6b85cca7:0x72ff4dec427ce4d3!8m2!3d19.3268428!4d-103.7631655!9m1!1b1!16s%2Fg%2F11wtwslbgs?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D">Leer Más Testimonios</Link>
                        </Button>
                    </div>
                </div>
            </Reveal>
        </div>
    )
}