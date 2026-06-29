import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

interface FullScreenProps{
    isOpen: boolean
    onToggle: () => void
}

export function FullScreen({ isOpen, onToggle }: FullScreenProps){
    return(
        <button onClick={onToggle}>
            {isOpen
            ? <BsFullscreenExit className="text-gray-400 cursor-pointer hover:text-white" />
            : <BsFullscreen className="text-gray-400 cursor-pointer hover:text-white" />
            }
        </button>
    )
}