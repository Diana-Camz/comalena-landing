import { IoMdCloseCircle } from "react-icons/io";
import { useCart } from "@/context/CartContext";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./ui/button";
import { OrderItem } from "@/types/types";

type OrderSheetProps = {
    setActive: (active: boolean) => void;
};

type GroupedOrder = {
    [pizzaId: string]: {
        title: string,
        items: OrderItem[]
    }
}
export default function OrderSheet({ setActive }: OrderSheetProps) {
    const {setQuantity, removeItem, order, total} = useCart();

    const groupedOrder = order.reduce<GroupedOrder>((acc, item ) => {
        if (!acc[item.pizzaId]) {
            acc[item.pizzaId] = {
            title: item.title,
            items: []
            };
        }
        acc[item.pizzaId].items.push(item);
        return acc;
    }, {});

    const SIZE_LABELS: Record<string, string> = {
        sm: "CH",
        md: "MED",
        lg: "GDE",
    };

  return (
    <section className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            <div 
                onClick={() => setActive(false)}
                className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex justify-center items-center">
                <div
                    onClick={(e) => e.stopPropagation()} 
                    className="relative flex flex-col w-4/5 max-w-[420px] sm:max-w-[640px] lg:w-lg rounded-2xl bg-input py-4 px-2 sm:p-6 md:p-8 lg:p-8 overflow-hidden">
                    <div className="relative bottom-3 left-1 md:bottom-5 md:left-5 flex justify-end">
                        <button
                            type="button"
                            onClick={() => setActive(false)}
                            className="text-red hover:text-red/80 cursor-pointer active:scale-80 transition duration-120"
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
                        Tu Orden
                    </h3>
                        {order.length > 0 ? (
                            <div className="flex flex-col">
                                <div className="max-h-[350px] overflow-y-auto sin-scrollbar border-b-2 border-red  shadow-inner-bottom">
                                {Object.entries(groupedOrder).map(([pizzaId, group]) => {
                                const sizeMap: { [size: string]: OrderItem } = {};
                                group.items.forEach(item => {
                                    if(!sizeMap[item.size]) {
                                        sizeMap[item.size] = {...item};
                                    } else {
                                        sizeMap[item.size].quantity += item.quantity;
                                    }
                                })
                                return (
                                <div key={pizzaId} className="flex flex-col mb-4">
                                    <h2 className="text-lg md:text-xl font-medium text-card-foreground mb-2">{group.title}</h2>
                                    {Object.values(sizeMap).map(item => (
                                        <div key={`${item.pizzaId}-${item.size}`} className="flex justify-between items-center py-2 md:px-2 md:py-1 border-b-2 sm:border-0 border-red/20 md:rounded-lg hover:bg-card-foreground/10 transition">
                                        <div className="w-20 md:w-26 items-center flex justify-between">
                                            <button 
                                            onClick={() => setQuantity(item.pizzaId, item.size, item.quantity - 1)}
                                            className="cursor-pointer"
                                            >
                                            <CiCircleMinus className="w-8 h-8 md:w-10 md:h-10 rounded-full text-red hover:bg-red transition duration-120 hover:text-background active:scale-80 active:bg-red/70 active:text-background"/>
                                            </button>
                                            <p className="font-normal text-md md:text-lg">{item.quantity}</p>
                                            <button 
                                            onClick={() => setQuantity(item.pizzaId, item.size, item.quantity + 1)}
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
                                            onClick={() => removeItem(item.pizzaId, item.size)}
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
                            <div  className="flex items-center w-full justify-center  mt-3">
                                <Button 
                                    onClick={() => {}}
                                    className="w-1/2 cursor-pointer h-12 bg-red/95 hover:bg-red/80 active:bg-red/80 active:scale-97 transition duration-120 text-background text-lg font-medium">
                                    <p className="text-md md:text-lg">Enviar mi orden</p>
                                </Button>
                            </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-[clamp(1.1rem,3.2vw,1.8rem)] font-gothic text-card-foreground/80">Aún no has agregado nada a tu orden.</p>
                            </div>
                        )}
                </div>
            </div>
        
    </section>
  )
}