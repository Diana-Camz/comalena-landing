import Layout from "@/components/Layout";
import Image from "next/image";

export default function contactPage() {
    return (
        <Layout>
            <section className="py-16 text-center">
                {/* Título principal */}
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-foreground mb-8">
                    Contáctanos
                </h1>

                {/* Cómo ordenar */}
                <div className="mb-10 flex flex-col items-center lg:mt-24">
                    <h2 className="font-display text-2xl lg:text-5xl mb-3">
                    ¿Cómo puedes realizar tu orden?
                    </h2>

                    <p className="lg:text-xl text-foreground/80 mb-2 lg:mt-4">
                    Envía un WhatsApp o llámanos al
                    <span className="font-medium text-foreground"> 312 270 3873</span>
                    </p>

                    <p className="text-foreground/70 lg:text-lg">
                    Estaremos atentos para atenderte lo más rápido posible.
                    </p>

                    <a
                    href="https://wa.me/523122703873"
                    target="_blank"
                    className="inline-block mt-4 rounded-full bg-primary px-6 py-3 text-background font-medium transition hover:opacity-90"
                    >
                    Enviar WhatsApp
                    </a>
                </div>

                {/* Reviews */}
                <div className="mb-10 lg:mt-24">
                    <h3 className="font-display text-5xl mb-3 tracking-wide">
                    ¡ Déjanos tu review !
                    </h3>
                    <p className="text-foreground/70 lg:text-lg">
                    Queremos conocer tu opinión sobre nuestra pizza y servicio.
                    </p>

                    <div className="flex gap-6 text-center justify-center mt-8">
                    <a
                        href="https://www.google.com/maps/place/Comale%C3%B1a+Pizza/@19.3268478,-103.7657404,17z/data=!4m8!3m7!1s0x8425457c6b85cca7:0x72ff4dec427ce4d3!8m2!3d19.3268428!4d-103.7631655!9m1!1b1!16s%2Fg%2F11wtwslbgs?authuser=0&entry=ttu&g_ep=EgoyMDI2MDEwNC4wIKXMDSoKLDEwMDc5MjA3M0gBUAM%3D"
                        className="text-lg flex flex-col items-center hover:text-primary transition lg:mr-12"
                    >
                        <Image src='/images/google_maps.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Google Maps
                    </a>

                    <a
                        href="#"
                        className="text-lg flex flex-col items-center hover:text-primary transition"
                    >
                        <Image src='/images/facebook.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Facebook
                    </a>
                    </div>
                </div>

                {/* Redes sociales */}
                <div className="lg:mt-24">
                    <h3 className="font-display text-5xl mb-3 tracking-wide">
                    Síguenos en nuestras redes
                    </h3>
                    <p className="text-foreground/70 lg:text-lg">Conoce nuestras promociones, novedades y el día a día detrás del horno.</p>

                    <div className="flex gap-6 text-center justify-center mt-8">
                    <a
                        href="#"
                        className="text-lg flex flex-col items-center hover:text-primary transition lg:mr-12"
                    >
                        <Image src='/images/instagram.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Instagram
                    </a>

                    <a
                        href="#"
                        className="text-lg flex flex-col items-center hover:text-primary transition"
                    >
                        <Image src='/images/facebook.svg' alt='Google Maps' width={60} height={60} className="inline-block mb-2"/>
                        Facebook
                    </a>
                    </div>
                </div>


                 {/* Dudas o sugerencias */}
                <div className="mb-10 lg:mt-24">
                    <p className="text-lg text-foreground/80">
                    ¿Tienes alguna duda o sugerencia?  
                    <span className="font-medium text-foreground"> Estamos para ayudarte.</span>
                    </p>
                    <p className="text-lg text-foreground/80 mb-2">
                    Envía un WhatsApp o llámanos al
                    <span className="font-medium text-foreground"> 312 270 3873</span>
                    </p> 
                    <p className="text-lg text-foreground/80 mb-2"> o envianos un email a <span className="font-medium text-foreground"> comalena.pizza@gmail.com</span></p>
                </div>
            </section>
        </Layout>
    )
}