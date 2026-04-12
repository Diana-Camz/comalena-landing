
interface SwitchButtonProps {
    setShowList: React.Dispatch<React.SetStateAction<boolean>>;
    showList: boolean;
    secondLabel?: string;
}

export default function SwitchButton ({
    showList,
    setShowList,
    secondLabel = "Ingredientes"
}: SwitchButtonProps) {
    return (
        <div className="flex justify-center p-1 mb-4 border rounded-full border-amber-900">
        <button
            className={`px-4 py-2 w-1/2 rounded-full ${!showList ? 'bg-red text-background' : 'bg-gray-200 text-card-foreground/70'} cursor-pointer`}
            onClick={() => setShowList(false)}
        >
            Tamaños
        </button>
        <button
            className={`pl-4 pr-6 py-2 rounded-full w-1/2 ${showList ? 'bg-red text-background' : 'bg-gray-200 text-card-foreground/70'} cursor-pointer`}
            onClick={() => setShowList(true)}
        >
            {secondLabel}
        </button>
        </div>
    )
}