import { useEffect, useRef, useState } from "react";
import { AlbumOptionsMenu } from "./AlbumOptionsMenu";
import { BsThreeDots } from "react-icons/bs";

interface AlbumOptionsButtonProps{
    artistId:string;
    albumId: string;
}


export function AlbumOptionsButton({albumId, artistId}:AlbumOptionsButtonProps){
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }, []);
    
    function handleClick(){
        setIsOpen((prev) => !prev);
    }

    return(
        <div ref={containerRef} className="relative">
            <button type="button" onClick={handleClick} 
            className="cursor-pointer hover:border-gray-400 hover:border
            hover:rounded-sm">
                <BsThreeDots size={20} className="text-gray-400 hover:text-white" />
            </button>
            {isOpen && (
                <div className="absolute left-0 z-100 w-54">
                    <AlbumOptionsMenu
                        albumId={albumId}
                        artistId={artistId}/>
                </div>
            )}
        </div>
        )
}