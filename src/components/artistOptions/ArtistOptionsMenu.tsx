import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { RiUserAddLine } from "react-icons/ri";
import { TbPinFilled } from "react-icons/tb";



interface ArtistOptionsProps{
    artistId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function ArtistOptionsMenu({}: ArtistOptionsProps){
    const containerRef = useRef<HTMLDivElement>(null);

    function handleFixArtist(){

    }

    return(
        <div
        className="flex bg-[#282828] flex-col 
        rounded-lg px-4 py-2 gap-y-2">
            
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <RiUserAddLine/>
                    Seguir
            </button>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <IoMdClose/>
                    Deixar de seguir
            </button>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <TbPinFilled/>
                    Fixar artista
            </button>
            <button className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <TbPinFilled/>
                Remover pin do artista 
            </button>
            
        </div>
    )
}