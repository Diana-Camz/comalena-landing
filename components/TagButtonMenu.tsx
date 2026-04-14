type TagButtonProps = {
  label: string;
  active: boolean;
  type?: string;
  onClick: () => void;
};

export default function TagButton({ label, active, type, onClick }: TagButtonProps) {
  const isSubmenu = type === "submenu"
  return (
    <div>
      {!isSubmenu ? (
        <button
          type="button"
          onClick={onClick}
          className={`
            px-3 lg:px-4 py-2 rounded-full text-[clamp(0.85rem,1.2vw,1.2rem)] transition cursor-pointer
            ${ active
              ? "bg-secondary/70 " 
              : "bg-background  ring-1 ring-black/10 hover:bg-ring/10"
            }
          `}
        >
            <p 
            className={`
              ${active ? "text-background" : "text-card-foreground/75"}
              `}
            >
            {label}
            </p>
        </button>
    ) : (
        <button
          type="button"
          onClick={onClick}
          className={`
            px-3 lg:px-4 py-2 border-red rounded-full text-[clamp(0.85rem,1.2vw,1.2rem)] transition cursor-pointer
            ${ active
              ? "bg-red/70 border-2 border-red/80" 
              : "border-2 border-red/80 ring-1 ring-black/10 hover:bg-ring/10"
            }
          `}
        >
            <p 
            className={`
              ${active ? "text-background" : "text-red/80 "}
              `}
            >
            {label}
            </p>
        </button>
    )}
    </div>
  );
}