import { Button } from "@/components/ui/button"
import Image from "next/image"
import FeatCard from "./FeatCard"
import TestimonialCard from "./TestimonialCard"
import Link from "next/link"

export default function Features() {
    return (
        <div className='lg:mt-50'>
            <div className="text-center mb-4"> {/* Presentacion de Comalena */}
                <h2 className="lg:text-8xl text-red">CONOCE EL SABOR DE COMALEÑA</h2>
            </div>
            <div className="flex justify-end lg:items-center lg:px-40  lg:mt-40">
               <div className='lg:mr-8'>
                 <p className="lg:text-3xl text-card-foreground/70 font-gothic lg:mb-6">
                    En Comaleña preparamos <span className="font-bold">pizza artesanal al horno</span>, con <span className="font-bold">ingredientes frescos</span>,
                    <span className="font-bold"> masa hecha en casa</span> y recetas que resaltan el sabor auténtico en cada rebanada.
                </p>
                <p className="lg:text-3xl text-card-foreground/70 font-gothic lg:mb-6">
                    Cada pizza se hornea al momento para lograr una textura crujiente y un sabor inigualable.
                </p>
               </div>
               <div className="lg:ml-8 ">
                <Image src='/images/hero2.jpg' alt='Pizza Comalena' width={1400} height={900} objectFit="cover" className="rounded-xl shadow-lg"/>
               </div>
            </div>
            <div className="mb-4 lg:mt-40"> {/* Las pizzas mas pedidas */}
                <div className="text-center">
                    <h2 className="lg:text-6xl text-secondary/60 ">Las más pedidas</h2>
                    <p className="lg:mt-2 lg:text-2xl text-card-foreground/50 font-gothic">Ingredientes frescos y recetas que conquistan desde la primera rebanada.</p>
                </div>
                <div className="lg:mt-12">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatCard title="Margarita" description="Salsa de tomate, queso, albahaca fresca y aceite de oliva." imageUrl="/images/margarita.jpg" price="$159"/>
                        <FeatCard title="Pepperoni" description="Salsa de tomate, queso y abundantes rodajas de pepperoni." imageUrl="/images/pepperoni.webp" price="$179"/>
                        <FeatCard title="Hawaiana" description="Salsa de tomate, queso, jamón y piña jugosa." imageUrl="/images/hawaiana.webp" price="$169"/>
                        <FeatCard title="Mexicana" description="Salsa de tomate, queso, jalapeno, jitomate, cebolla y chorizo." imageUrl="/images/mexicana.webp" price="$169"/>
                    </div>
                    <div  className="flex gap-4 items-center justify-center mt-24">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link href="/menu" className="lg:text-lg">Ver Menú Completo</Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="mb-4 lg:mt-40"> {/* Testimonios de clientes */}
                <div className="text-center">
                    <h2 className="text-secondary/60 lg:text-6xl">Opiniones de nuestros clientes</h2>
                </div>
                <div className="lg:mt-12">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <TestimonialCard client="Guillermo" testimonial="Excelente variedad!! Mi favorita la pizza es doggo. Mil veces mejor que la de adobe pizza" rate={5} date="2024-05-15"/>
                        <TestimonialCard client="Luis" testimonial="Muy buen sabor de la pizza y un excelente servicio!" rate={5} date="2024-05-15"/>
                        <TestimonialCard client="Melina" testimonial="Están super ricas las pizzas. Siempre son muy amables, de momento el servicio es solo para llevar, nos encanta pedir cada domingo" rate={5} date="2024-05-15"/>
                        <TestimonialCard client="Gariel" testimonial="Completamente y totalmente la mejor Pizza de Comala que he probado, excelente sabor, textura, super deliciosa, hemos ordenado 8 veces y 0 problemas 10 de 10." rate={5} date="2024-05-15"/>
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-24">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link className="lg:text-lg" href="https://www.google.com/maps/place/Comale%C3%B1a+Pizza/@19.3268478,-103.7657404,17z/data=!4m8!3m7!1s0x8425457c6b85cca7:0x72ff4dec427ce4d3!8m2!3d19.3268428!4d-103.7631655!9m1!1b1!16s%2Fg%2F11wtwslbgs?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D">Leer Más Testimonios</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}