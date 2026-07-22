interface SelectionButtonProps {
    label: string
    selected?: boolean
    onClick?: () => void
}

export function SelectionButton({ label, selected = false, onClick }: SelectionButtonProps){
    return(
        <button className={`flex items-center justify-between
            rounded-4xl px-3 py-1 text-sm cursor-pointer hover:bg-[#4E4E4E]
            ease-out duration-300
                ${selected
                    ? "bg-white text-[#343333] hover:bg-gray-200"
                    : "bg-[#343333] text-white hover:bg-[#4E4E4E]"
                }
            `}
            onClick={onClick}
            >
            <h2>{label}</h2>
        </button>
    )
}
