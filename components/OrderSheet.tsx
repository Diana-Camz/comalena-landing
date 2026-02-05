import { IoMdCloseCircle } from "react-icons/io";
import { useCart } from "@/context/CartContext";

type OrderSheetProps = {
    setActive: (active: boolean) => void;
};
export default function OrderSheet({ setActive }: OrderSheetProps) {
    const {customerInfo, order} = useCart();
  return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            <div 
                onClick={() => setActive(false)}
                className="fixed inset-0 bg-card-foreground/80 bg-opacity-50 z-50 mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()} 
                    className="relative flex flex-col justify-evenly w-4/5 max-w-[420px] sm:max-w-[640px] lg:max-w-4xl xl:max-w-6xl rounded-2xl bg-input p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
                    <div className="relative bottom-3 left-3 md:bottom-5 md:left-5 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setActive(false)}
                            className=" text-card-foreground/80 cursor-pointer"
                        >
                            <IoMdCloseCircle 
                            className="
                                w-8 h-8
                                sm:w-9 sm:h-9
                                md:w-12 md:h-12
                                lg:w-13 lg:h-13
                            "/>
                        </button>
                    </div>
                        {order.length > 0 ? (
                            <div>
                                <p>{customerInfo.name}</p>
                                <p>{order.length}</p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-2xl font-bold mb-4">Tu orden</p>
                                <p className="text-lg text-card-foreground/80">Aún no has agregado nada a tu orden.</p>
                            </div>
                        )}
                </div>
            </div>
        
    </section>
  )
}