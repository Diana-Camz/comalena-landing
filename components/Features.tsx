import { Button } from "@/components/ui/button"
import Image from "next/image"
import FeatCard from "./FeatCard"

export default function Features() {
    return (
        <div className='mt-16'>
            <div className="text-center mb-4"> {/* Presentacion de Comalena */}
                <h2 className="font-display lg:text-4xl text-foreground">Conoce el Sabor de Comalena !!</h2>
            </div>
            <div className="flex justify-end lg:items-center lg:px-48">
               <div className='lg:mr-8'>
                 <p className="lg:text-lg text-foreground/80 leading-relaxed lg:mb-6">
                    En Comaleña preparamos pizza artesanal al horno, con ingredientes frescos,
                    masa hecha en casa y recetas que resaltan el sabor auténtico en cada rebanada.
                </p>
                <p className="lg:text-lg text-foreground/80 leading-relaxed lg:mb-6">
                    Cada pizza se hornea al momento para lograr una textura crujiente y un sabor inigualable.
                </p>
               </div>
               <div className="lg:ml-8 ">
                <Image src='/images/hero2.jpg' alt='Pizza Comalena' width={1400} height={900} objectFit="cover" className="rounded-xl shadow-lg"/>
               </div>
            </div>
            <div className="mb-4"> {/* Las pizzas mas pedidas */}
                <div className="text-center lg:mt-30">
                    <h2 className="font-display lg:text-4xl text-foreground">Las más pedidas de Comaleña</h2>
                    <p className="lg:mt-2">Ingredientes frescos y recetas que conquistan desde la primera rebanada.</p>
                </div>
                <div className="lg:mt-12">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        <FeatCard title="Margarita" description="Masa artesanal, salsa de tomate, mozzarella, albahaca fresca y aceite de oliva." imageUrl="/images/margarita.jpg" price="$159"/>
                        <FeatCard title="Pepperoni" description="Masa artesanal, salsa de tomate, mozzarella y abundantes rodajas de pepperoni." imageUrl="/images/pepperoni.webp" price="$179"/>
                        <FeatCard title="Hawaiana" description="Masa artesanal, salsa de tomate, mozzarella, jamón y piña jugosa." imageUrl="/images/hawaiana.webp" price="$169"/>
                        <FeatCard title="Mexicana" description="Masa artesanal, salsa de tomate, mozzarella, jalapeno, jitomate, cebolla y chorizo." imageUrl="/images/mexicana.webp" price="$169"/>
                    </div>
                    <div  className="flex gap-4 items-center justify-center mt-8">
                        <Button className="cursor-pointer h-10 hover:bg-amber-700">Ver Menu Completo</Button>
                    </div>
                </div>
            </div>
            <div>
                <h3>Pizzas hechas desde Comala con amor</h3>
                <p>aqui va una breve historia de comalena, quizas imagenes del lado izquierdo</p>
            </div>
        </div>
    )
}