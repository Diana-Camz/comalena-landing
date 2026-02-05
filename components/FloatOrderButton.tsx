import Image from "next/image";

type ButtonProps = {
    active: boolean;
    setActive : (active: boolean) => void;
}

export default function FloatOrderButton({active, setActive}: ButtonProps) {
    return (
        <button onClick={() => setActive(!active)} className="border-2 rounded-lg border-card-foreground/30 hover:scale-105 transition-transform cursor-pointer mb-2 bg-orange-100">
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
    )
}