import Image from "next/image";
import { useCart } from "@/context/CartContext";

type ButtonProps = {
    active: boolean;
    setActive : (active: boolean) => void;
}

export default function FloatOrderButton({active, setActive}: ButtonProps) {
    const {order} = useCart();
    return (
        <div>
            <button onClick={() => setActive(!active)} className="border-2 rounded-lg border-card-foreground/30 hover:scale-105 transition-transform cursor-pointer mb-2 active:scale-95 duration-120 bg-orange-100">
            {active ? (
                <a>
                    <Image src="/images/pizza-box.png" alt="Close" width={56} height={56}/>
                </a>
            ) : (
                <a>
                    <Image src="/images/pizza-box-closed.png" alt="Open" width={56} height={56}/>
                </a>
            )}
        </button>
        {order.length > 0 && (
            <div className="absolute -top-1 -right-1 bg-red/95 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-normal">
                <p>{order.reduce((total, item) => total + item.quantity, 0)}</p>
            </div>
        )}
        </div>

    )
}