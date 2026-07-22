import { Link } from "react-router-dom"
import { ImagePlaceholder } from "../ImagePlaceholder"
import { AlbumOptionsMenu } from "../albumOptions/AlbumOptionsMenu"
import { useFetch } from "../../hooks/useFetch"
import * as albumService from "../../services/AlbumService"
import { useEffect, useRef, useState } from "react"

interface AlbumCardProps {
    name: string
    albumId: string
    imageUrl?: string
}

export function AlbumCard({ name, albumId, imageUrl }: AlbumCardProps) {
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

    const { data: albumData } = useFetch(
        () => albumId ? albumService.getAlbumById(albumId) : Promise.resolve(null),
        [albumId]
    );

    return (
        <Link to={`/AlbumScreen/${albumId}`}
        onContextMenu={handleContextMenu}
        className="flex items-center justify-start gap-2
        rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
            <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="playlist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Álbum</span>
            </div>
            {contextMenu && albumData && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => { event.preventDefault(); event.stopPropagation(); }}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <AlbumOptionsMenu
                    albumId={albumId}
                    artistId={albumData.artistId}/>
                </div>
            )}
        </Link>
    )
}
