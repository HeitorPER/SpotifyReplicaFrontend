import { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MusicOptionsMenu } from "./MusicOptionsMenu";

export function MusicOptionsButton(){
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
        <div ref={containerRef} className="relative"
        style={{ position: "fixed"}}>
            <button type="button" onClick={handleClick} 
            className="cursor-pointer hover:border-gray-400 hover:border
            hover:rounded-sm">
                <BsThreeDots size={20} className="text-gray-400 hover:text-white" />
            </button>
            {isOpen && <MusicOptionsMenu />}
        </div>
    )
}