import { useState} from "react";

interface SelectionButtonProps {
    label: string
}

export function SelectionButton({ label }: SelectionButtonProps){
    const [selected, isSelected] = useState(false);
    
    return(
        <button className={`flex items-center justify-between px-4
            rounded-4xl font-bold py-2 cursor-pointer hover:bg-[#4E4E4E] 
            ease-out duration-300
                ${selected
                    ? "bg-white text-[#343333] hover:bg-gray-200"
                    : "bg-[#343333] text-white hover:bg-[#4E4E4E]"
                }
            `}
            onClick={() => isSelected(!selected)}
            >
            {selected }
            <h2>{label}</h2>
        </button>
    )
}
