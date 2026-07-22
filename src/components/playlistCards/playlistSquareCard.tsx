import { Link } from "react-router-dom"
import { ImagePlaceholder } from "../ImagePlaceholder"
import { PlaylistOptionsMenu } from "../playlistOptions/PlaylistOptionsMenu"
import { useEffect, useRef, useState } from "react"

interface PlaylistCardProps {
    name: string
    imageUrl?: string
    playlistId: string
}

export function PlaylistSquareCard({ name, imageUrl, playlistId }: PlaylistCardProps) {
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
        <Link to={`/PlaylistScreen/${playlistId}`}
        onContextMenu={handleContextMenu}
        className="flex flex-col cursor-pointer hover:bg-[#2D2D2D] rounded-lg p-2 w-40 shrink-0">
            <div className="w-full aspect-square rounded overflow-hidden mb-2">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="playlist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Playlist</span>
            </div>
            {contextMenu && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <PlaylistOptionsMenu
                    playlistId={playlistId}
                    name={name}
                    onClose={() => setContextMenu(null)}
                    onSelect={() => setContextMenu(null)}/>
                </div>
            )}
        </Link>
    )
}