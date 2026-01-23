import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"

export default function contactPage() {
    return (
        <Layout>
            <section className="py-16 text-center">
                {/* Título principal */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl text-secondary mb-8">
                    Contáctanos
                </h1>

                {/* Cómo ordenar */}
                <div className="mb-10 flex flex-col items-center lg:mt-24">
                    <h2 className="text-red  text-2xl lg:text-5xl mb-3">
                    ¿Cómo puedes realizar tu orden?
                    </h2>

                    <p className="lg:text-2xl font-gothic text-card-foreground/70 mb-2 lg:mt-4">
                    Envía un WhatsApp o llámanos al
                    <span className="font-medium font-gothic text-card-foreground lg:text-3xl"> 312 270 3873</span>
                    </p>

                    <p className="text-card-foreground/70 font-gothic lg:text-2xl">
                    Estaremos atentos para atenderte lo más rápido posible.
                    </p>

                    <div  className="flex gap-4 items-center justify-center mt-10">
                        <Button className="cursor-pointer h-12 hover:bg-secondary/80">
                            <Link href="/menu" className="lg:text-lg">Enviar WhatsApp</Link>
                        </Button>
                    </div>
                </div>

                {/* Reviews */}
                <div className="mb-10 lg:mt-24">
                    <h3 className="text-red text-2xl lg:text-5xl mb-3">
                    ¡ Déjanos tu review !
                    </h3>
                    <p className="text-card-foreground/70 lg:text-2xl font-gothic lg:mt-4">
                    Queremos conocer tu opinión sobre nuestra pizza y servicio.
                    </p>

                    <div className="flex gap-6 text-center justify-center mt-8 ">
                    <a
                        href="https://www.google.com/maps/place/Comale%C3%B1a+Pizza/@19.3268478,-103.7657404,17z/data=!4m8!3m7!1s0x8425457c6b85cca7:0x72ff4dec427ce4d3!8m2!3d19.3268428!4d-103.7631655!9m1!1b1!16s%2Fg%2F11wtwslbgs?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                        className="text-lg flex flex-col items-center text-card-foreground/70 hover:text-card-foreground transition lg:mr-12"
                    >
                        <Image src='/images/google_maps.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Google Maps
                    </a>

                    <a
                        href="#"
                        className="md:text-lg flex flex-col items-center text-card-foreground/70 hover:text-card-foreground transition"
                    >
                        <Image src='/images/facebook.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Facebook
                    </a>
                    </div>
                </div>

                {/* Redes sociales */}
                <div className="lg:mt-24">
                    <h3 className="text-red text-2xl lg:text-5xl mb-3">
                    Síguenos en nuestras redes
                    </h3>
                    <p className="text-card-foreground/70 lg:text-2xl font-gothic lg:mt-4">Conoce nuestras promociones, novedades y el día a día detrás del horno.</p>

                    <div className="flex gap-6 text-center justify-center mt-8">
                    <a
                        href="#"
                        className="text-lg flex flex-col items-center text-card-foreground/70 hover:text-card-foreground transition lg:mr-12"
                    >
                        <Image src='/images/instagram.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Instagram
                    </a>

                    <a
                        href="#"
                        className="text-lg flex flex-col items-center text-card-foreground/70 hover:text-card-foreground transition"
                    >
                        <Image src='/images/facebook.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Facebook
                    </a>
                    </div>
                </div>


                 {/* Dudas o sugerencias */}
                <div className="mb-10 lg:mt-24">
                    <p className="text-card-foreground/70 lg:text-2xl font-gothic">
                    ¿Tienes alguna duda o sugerencia?  
                    <span className="text-card-foreground/70 lg:text-2xl font-gothic"> Estamos para ayudarte.</span>
                    </p>
                    <p className="text-card-foreground/70 lg:text-2xl font-gothic">
                    Envía un WhatsApp o llámanos al
                    <span className="text-red lg:text-2xl font-gothic"> 312 270 3873</span>
                    </p> 
                    <p className="text-card-foreground/70 lg:text-2xl font-gothic"> o envianos un email a <span className="font-medium text-red"> comalena.pizza@gmail.com</span></p>
                </div>
            </section>
        </Layout>
    )
}