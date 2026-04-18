import { IoMdCloseCircle } from "react-icons/io";
import { Button } from "./ui/button";
import { useCart } from "@/context/CartContext";


type AlertForClearCartProps = {
    setActiveAlertForClearCart: (active: boolean) => void;
};


export default function AlertForClearCart ({setActiveAlertForClearCart}: AlertForClearCartProps) {
    const {clearCart} = useCart();

    const handleClearCart = () => {
        clearCart();
        setActiveAlertForClearCart(false);
    }
    
    return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
        <div 
        onClick={() => setActiveAlertForClearCart(false)}
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center">
            <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative flex flex-col w-4/5 max-w-[420px] sm:max-w-[640px] lg:w-lg rounded-2xl bg-input py-4 px-2 sm:p-6 md:p-8 lg:p-8 overflow-hidden">
                <div
                className=" bottom-3  flex justify-end items-center">
                    <button
                    type="button"
                    onClick={() => setActiveAlertForClearCart(false)}
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
                    <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] text-red font-gothic mb-2 text-center ">Tu orden se eliminará</h3>
                    <p className="text-[clamp(1.1rem,3.2vw,1.8rem)] text-center font-gothic text-card-foreground/80">¿Estas seguro de que quieres vaciar el carrito?
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center mt-5">
                    <Button
                        type="button" 
                        onClick={handleClearCart}
                        className="w-1/2 cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
                        <p className="text-md md:text-lg">Aceptar</p>
                    </Button>
                    <Button
                        type="button" 
                        onClick={() => setActiveAlertForClearCart(false)}
                        className="w-1/2 cursor-pointer h-12 mt-2 bg-opacity-50 hover:bg-red/20  active:text-card active:bg-red/40 active:scale-97 transition duration-120 text-red/85 border-2 border-red/85 text-lg font-medium">
                        <p className="text-md md:text-lg">Cancelar</p>
                    </Button>
                </div>
            </div>
        </div>
    </section>
    )
}