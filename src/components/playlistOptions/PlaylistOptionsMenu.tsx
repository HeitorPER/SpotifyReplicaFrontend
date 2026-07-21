import { FiMinusCircle } from "react-icons/fi";
import { RxPencil1 } from "react-icons/rx";
import { IoLockClosedOutline, IoLockOpenOutline  } from "react-icons/io5";
import { TbPinFilled } from "react-icons/tb";
import { PLaylistDeatilsEditPopup } from "./PlaylistDetailsEditPopup";
import { useRef, useState } from "react";
import { ConfirmDeletion } from "./ConfirmDeletion";

interface PlaylistOptionsProps{
    name: string
    playlistId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function PlaylistOptionsMenu({name, playlistId, onClose }: PlaylistOptionsProps){
    const [isOpen, setOpen] = useState(false);
    const [isOpenDelete, setOpenDelete] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    function handleOpenDetails(){
        setOpen((prev) => !prev);
    }
    function handleOpendDeleteConfirm(){
        setOpenDelete((prev) => !prev)
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
                                onSelect={onClose}
                                onClose={onClose}
                                playlistId={playlistId}/>
                }
            </div>
            <div ref={containerRef} className="relative">
                <button
                onClick={handleOpendDeleteConfirm}
                className="flex items-center text-[#B3B3B3] hover:text-white
                cursor-pointer gap-2">
                    <FiMinusCircle/>
                    Apagar playlist
                </button>
                {isOpenDelete && <ConfirmDeletion
                            name={name}
                            onSelect={onClose}
                            onClose={onClose}
                            playlistId={playlistId}/>
                }
            </div>
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