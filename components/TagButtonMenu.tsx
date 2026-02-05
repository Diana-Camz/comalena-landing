export function TagButtonMenu({size}: {size: string}) {
    return (
        <p className="text-[clamp(0.65rem,1.0vw,1.6rem)] min-[731px]:text-[clamp(0.65rem,1.1vw,1.5rem)] min-[900px]:text-[clamp(.90rem,1vw,1.03rem)] uppercase tracking-wide text-card-foreground/60 border-2 rounded-xl px-2 lg:px-2">
            {size}
        </p>
    )
}