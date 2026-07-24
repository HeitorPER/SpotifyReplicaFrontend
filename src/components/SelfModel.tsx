interface ShelfProps {
    label: string
    children: React.ReactNode
}

export function Shelf({ label, children }: ShelfProps) {
    return (
        <div className="flex flex-col gap-y-2 w-full">
            <h2 className="text-white font-semibold text-lg">{label}</h2>
            <div className="overflow-x-auto no-scrollbar">{children}</div>
        </div>
    )
}