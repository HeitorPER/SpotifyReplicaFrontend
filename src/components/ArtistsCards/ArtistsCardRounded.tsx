import { Link } from "react-router-dom"
import { ImagePlaceholder } from "../ImagePlaceholder"
import { ArtistOptionsMenu } from "../artistOptions/ArtistOptionsMenu"
import { useEffect, useRef, useState } from "react"

interface ArtistsCardProps {
    name: string
    artistId: string
    imageUrl?: string
}

export function ArtistsCardRounded({ name, artistId, imageUrl}: ArtistsCardProps) {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);

    function handleContextMenu(event: React.MouseEvent){
        event.preventDefault();
        setContextMenu({ x: event.clientX, y: event.clientY });
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
                setContextMenu(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <Link className="flex flex-col cursor-pointer
        hover:bg-[#2D2D2D] rounded-lg p-2 w-40 shrink-0"
        to={`/ArtistScreen/${artistId}`}
        onContextMenu={handleContextMenu}>
            <div className="w-full aspect-square rounded-full overflow-hidden mb-2">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="artist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Artista</span>
            </div>
            {contextMenu && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <ArtistOptionsMenu
                    artistId={artistId}
                    onClose={() => setContextMenu(null)}
                    onSelect={() => setContextMenu(null)}/>
                </div>
            )}
        </Link>
    )
}