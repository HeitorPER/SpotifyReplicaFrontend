import { ImagePlaceholder } from "../ImagePlaceholder"
import { useFetch } from "../../hooks/useFetch"
import * as albumService from "../../services/AlbumService"
import { AlbumOptionsButton } from "../albumOptions/AlbumOptionsButton"
import { AlbumOptionsMenu } from "../albumOptions/AlbumOptionsMenu"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

interface AlbumResultCardProps {
    albumId: string
    name?: string
    imageUrl?: string
}

export function AlbumResultCard({ albumId, name, imageUrl }: AlbumResultCardProps) {
    const navigate = useNavigate();
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

    const displayName = name || albumData?.title;

    return (
        <button
            type="button"
            onClick={() => navigate(`/AlbumScreen/${albumId}`)}
            onContextMenu={handleContextMenu}
            className="w-full text-left cursor-pointer">
            <div className="flex justify-between items-center gap-x-4
            rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                        {imageUrl
                            ? <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
                            : <ImagePlaceholder type="playlist" />
                        }
                    </div>
                    <div className="flex flex-col min-w-40">
                        <h2 className="text-white text-sm font-medium truncate">{displayName}</h2>
                        <h2 className="text-gray-400 text-xs truncate">
                            Álbum{albumData?.artistName ? ` • ${albumData.artistName}` : ""}
                        </h2>
                    </div>
                </div>
                <div className="flex justify-between w-50">
                    <span className="bg-[#2D2D2D] rounded-md text-[#B3B3B3] text-xs px-3 py-1 justify-self-end">
                        Álbum
                    </span>
                    <div onClick={(event) => event.stopPropagation()} className="justify-self-center">
                        {albumData && (
                            <AlbumOptionsButton
                            albumId={albumId}
                            artistId={albumData.artistId}
                            menuAlign="right" />
                        )}
                    </div>
                </div>
            </div>
            {contextMenu && albumData && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => event.stopPropagation()}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <AlbumOptionsMenu
                    albumId={albumId}
                    artistId={albumData.artistId}/>
                </div>
            )}
        </button>
    )
}
