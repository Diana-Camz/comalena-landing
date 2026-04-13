import { IoMdArrowRoundBack, IoMdCloseCircle } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { OrderItem } from "@/types/types";
import CustomerForm from "./CustomerForm";
import { useState } from "react";

type OrderSheetProps = {
    setActive: (active: boolean) => void;
};

export default function OrderSheet({ setActive }: OrderSheetProps) {
    const {setQuantity, removeItem, buildWhatsAppMessage, clearCart, order, total, customerInfo} = useCart();
    const [step, setStep] = useState<"order" | "form">("order");

    const groupedOrder = order.reduce<Record<string, {title: string, items: OrderItem[]}>>((acc, item ) => {
        const ingredientKey = (item.selectedIngredients ?? []).slice().sort().join("-");
        const groupKey = `${item.itemId}-${ingredientKey}`;
        const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);
        const ingredientLabel = item.selectedIngredients && item.selectedIngredients.length > 0 
            ? ` - ${item.selectedIngredients.map(capitalize).join(", ")}`
            : "";
        
        if (!acc[groupKey]) {
            acc[groupKey] = {
                title: `${item.title}${ingredientLabel}`,
                items: []
            }
            }
        acc[groupKey].items.push(item);
        return acc;
    }, {});

    const SIZE_LABELS: Record<string, string> = {
        sm: "CH",
        md: "MED",
        lg: "GDE",
    };

    const handleSendWhatsApp = () => {
        const url = buildWhatsAppMessage("523121096301");
        window.open(url, "_blank");
    };

    const isFormValid =
        customerInfo.name.trim() !== "" &&
        customerInfo.address.trim() !== "" &&
        customerInfo.phone.trim() !== "";

  return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            <div 
                onClick={() => {setActive(false); setStep("order")}}
                className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()} 
                    className="relative flex flex-col w-4/5 max-w-[420px] sm:max-w-[640px] lg:w-lg rounded-2xl bg-input py-4 px-2 sm:p-6 md:p-8 lg:p-8 overflow-hidden">
                    <div className=" bottom-3  flex justify-between items-center">
                        <div className=" ">
                        {step === "form" && order.length > 0 && (
                            <button
                            type="button"
                            onClick={() => setStep("order")}
                            className="flex items-center text-lg text-red hover:text-red/80 cursor-pointer active:scale-80 transition duration-120"
                            >
                            <IoMdArrowRoundBack className="w-6 h-6 md:w-8 md:h-8"/>
                            <p className="text-sm md:text-lg">Regresar</p>
                            </button>
                        )}
                        </div>
                        <button
                            type="button"
                        onClick={() => {setActive(false); setStep("order")}}
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
                    <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] text-red font-gothic mb-2 text-center ">
                       {order.length === 0 
                        ? "Carrito Vacío" 
                        :  step === "order"
                            ? "Revisa tu orden"
                            : "Completa tus datos" }
                    </h3>
                        {order.length > 0 ? (
                            <div className="flex flex-col">
                                {step === "order" && (
                                <>
                                <div className="max-h-[355px] overflow-y-auto sin-scrollbar border-b-2 border-red  shadow-inner-bottom">
                                 {Object.entries(groupedOrder).map(([itemId, group]) => {
                                const sizeMap: { [size: string]: OrderItem } = {};
                                group.items.forEach(item => {
                                    if(!sizeMap[item.size]) {
                                        sizeMap[item.size] = {...item};
                                    } else {
                                        sizeMap[item.size].quantity += item.quantity;
                                    }
                                })
                                return (
                                <div key={itemId} className="flex flex-col mb-4">
                                    <h2 className="text-lg md:text-xl font-medium text-card-foreground mb-2">{group.title}</h2>
                                    {Object.values(sizeMap).map(item => (
                                        <div key={`${item.itemId}-${item.size}`} className="flex justify-between items-center py-2 md:px-2 md:py-1 border-b-2 sm:border-0 border-red/20 md:rounded-lg hover:bg-card-foreground/10 transition">
                                        <div className="w-20 md:w-26 items-center flex justify-between">
                                            <button 
                                            onClick={() => setQuantity(item.itemId, item.size, item.quantity - 1, item.selectedIngredients ?? [])}
                                            className="cursor-pointer"
                                            >
                                            <CiCircleMinus className="w-8 h-8 md:w-10 md:h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background"/>
                                            </button>
                                            <p className="font-normal text-md md:text-lg">{item.quantity}</p>
                                            <button 
                                            onClick={() => setQuantity(item.itemId, item.size, item.quantity + 1, item.selectedIngredients ?? [])}
                                            className="cursor-pointer"
                                            >
                                            <CiCirclePlus className="w-8 md:w-10 h-8 md:h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background"/>
                                            </button>
                                        </div>
                                        <div className="w-42 md:w-60  flex">
                                            <div className="w-2/3 flex justify-between md:pr-5 items-center">
                                                <p className="w-1/3 md:text-xl text-md text-center  text-card-foreground">{SIZE_LABELS[item.size]}</p>
                                                <p className="w-2/3 md:text-lg text-center md:text-end text-card-foreground/60 ">{item.unitPrice.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                                            </div>
                                           <div className="w-1/3 flex justify-end items-center">
                                             <p className="text-card-foreground md:text-lg">{(item.unitPrice * item.quantity).toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                                           </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.itemId, item.size, item.selectedIngredients ?? [])}
                                            className="p-2 rounded-full hover:bg-red/20 transition cursor-pointer duration-170 active:scale-80 active:bg-red/70 active:text-background mb-1">
                                            <FaRegTrashAlt  className="text-red w-5 h-5 " />
                                        </button>
                                    </div>))}
                                </div>)})
                            }
                            </div>
                            <div className="flex justify-between w-auto my-2 ">
                                <p className="font-gothic text-2xl text-card-foreground">Total: </p>
                                <p className="font-medium text-xl md:text-2xl text-red">{total.toLocaleString('es-MX', {style: 'currency', currency: 'MXN'})}</p>
                            </div>
                            </>)}
                        {step === "form" && <CustomerForm />}
                            <div  className="flex flex-col gap-2 items-center w-full justify-center mt-3">
                                {step === "order" ? (
                                    <Button
                                    type="button" 
                                    onClick={() => setStep("form")}
                                    className="w-1/2 cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
                                    <p className="text-md md:text-lg">Continuar</p>
                                    </Button>
                                ) : (
                                    <Button
                                    type="button" 
                                    disabled={!isFormValid}
                                    onClick={handleSendWhatsApp}
                                    className={`w-1/2 h-12 bg-red/95  transition duration-120 text-lg font-medium
                                        ${isFormValid 
                                            ? "cursor-pointer bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 text-background"
                                            :  "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                                    >
                                    <p className="text-md md:text-lg">Enviar mi orden</p>
                                </Button>
                                )}
                                <Button
                                    type="button" 
                                    onClick={clearCart}
                                    className="w-1/2 cursor-pointer h-12 bg-opacity-50 hover:bg-red/20  active:text-card active:bg-red/40 active:scale-97 transition duration-120 text-red/85 border-2 border-red/85 text-lg font-medium">
                                    <p className="text-md md:text-lg">Vaciar carrito</p>
                                </Button>
                            </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-[clamp(1.1rem,3.2vw,1.8rem)] text-center font-gothic text-card-foreground/80">Aún no has agregado nada a tu orden.</p>
                            </div>
                        )}
                </div>
            </div>
        
    </section>
  )
}