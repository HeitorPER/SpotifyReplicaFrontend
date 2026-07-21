import { FiMinusCircle } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
import { IoLockClosedOutline, IoLockOpenOutline  } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { PLaylistDeatilsEditPopup } from "./PlaylistDetailsEditPopup";
import { useRef, useState } from "react";

interface PlaylistOptionsProps{
    playlistId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function PlaylistOptionsMenu({playlistId, onClose}: PlaylistOptionsProps){
    const [isOpen, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function handleOpenDetails(){
        setOpen((prev) => !prev)
    }


    return(
        <div
        className="flex bg-[#282828] flex-col 
        rounded-lg px-4 py-2 gap-y-2">
            
            <div ref={containerRef} className="relative">
                <button
                onClick={handleOpenDetails}
                className="flex items-center text-[#B3B3B3] hover:text-white
                cursor-pointer gap-2">
                    <RxPencil1/>
                    Editar os detalhes
                </button>
                {isOpen && <PLaylistDeatilsEditPopup
                                onClose={onClose}
                                playlistId={playlistId}/>
                }
            </div>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <FiMinusCircle/>
                Apagar playlist
            </button>
            <button className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <IoLockClosedOutline/>
                Tornar particular
            </button>
            <button className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <IoLockOpenOutline/>
                Tornar publica
            </button>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <TbPinFilled/>
                Fixar playlist
            </button>
            
        </div>
    )
}