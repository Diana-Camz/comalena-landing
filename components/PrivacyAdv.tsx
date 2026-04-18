import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "./ui/button";

type PrivacyAdvertismentProps = {
    setActive: (active: boolean) => void;
};

export default function PrivacyAdvertisment ({setActive}: PrivacyAdvertismentProps) {
    
    return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <div 
        onClick={() => setActive(false)}
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center">
            <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative flex flex-col w-4/5 max-w-[420px] sm:max-w-[640px] lg:w-lg rounded-2xl bg-input py-4 px-2 sm:p-6 md:p-8 lg:p-8 overflow-hidden">
                <div
                className=" bottom-3  flex justify-end items-center">
                    <button
                    type="button"
                    onClick={() => setActive(false)}
                    className="text-red hover:text-red/80 cursor-pointer active:scale-80 transition duration-120 relative left-1 bottom-3 md:bottom-5 md:left-5"
                    >
                        <IoMdCloseCircle 
                        className="
                            w-8 h-8
                            sm:w-9 sm:h-9
                            md:w-10 md:h-10
                        "/>
                    </button>
                </div>
                <div>
                    <h3 className="text-center text-xl">Aviso de Privacidad</h3>
                    <p className="font-gothic text-justify leading-tight">En Comaleña Pizza, los datos personales que nos proporciones (como nombre, domicilio, teléfono y notas de pedido) serán utilizados únicamente para procesar y entregar tu orden.
                    No compartimos tu información con terceros y únicamente se utiliza para fines de contacto y entrega.
                    </p>
                    <p className="font-gothic text-justify leading-tight">
                    Puedes solicitar la modificación o eliminación de tus datos en cualquier momento contactándonos directamente.
                    Al realizar un pedido, aceptas el uso de tus datos conforme a este aviso de privacidad.
                    </p>
                </div>
                <div className="flex justify-center mt-5">
                    <Button
                        type="button" 
                        onClick={() => setActive(false)}
                        className="w-1/2 cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
                        <p className="text-md md:text-lg">Aceptar</p>
                    </Button>
                </div>
            </div>
        </div>
    </section>
    )
}