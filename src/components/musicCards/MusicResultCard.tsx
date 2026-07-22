import { ImagePlaceholder } from "../ImagePlaceholder"
import { usePlayer } from "../../context/PlayerContext"
import { useFetch } from "../../hooks/useFetch"
import * as musicService from "../../services/MusicService"
import { MusicOptionsButton } from "../musicCardOptions/OptionsButton"
import { MusicOptionsMenu } from "../musicCardOptions/MusicOptionsMenu"
import { useEffect, useRef, useState } from "react"

interface MusicResultCardProps {
    name?: string
    musicId: string
    artistName: string
    explicit?: boolean
    imageUrl?: string
}

export function MusicResultCard({ name, musicId, artistName, explicit, imageUrl }: MusicResultCardProps) {
    const { play } = usePlayer();
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

    const { data: musicData } = useFetch(
        () => musicId ? musicService.getMusicById(musicId) : Promise.resolve(null),
        [musicId]
    );

    const displayName = name || musicData?.title;
    const isExplicit = explicit ?? musicData?.explicit ?? false;

    return (
        <button
            type="button"
            onClick={() => play(musicId, { albumId: musicData?.albumId })}
            onContextMenu={handleContextMenu}
            className="w-full text-left cursor-pointer">
            <div className="flex justify-between items-center gap-x-4
            rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                        {imageUrl
                            ? <img src={imageUrl} alt={displayName} className="w-full h-full object-cover" />
                            : <ImagePlaceholder type="song" />
                        }
                    </div>
                    <div className="flex flex-col min-w-40">
                        <div className="flex items-center gap-1">
                            <h2 className="text-white text-sm font-medium truncate">{displayName}</h2>
                            {isExplicit && (
                                <span className="text-[10px] bg-gray-500 text-gray-200 px-1 rounded shrink-0">E</span>
                            )}
                        </div>
                        <h2 className="text-gray-400 text-xs truncate">
                            Música{artistName ? ` • ${artistName}` : ""}
                        </h2>
                    </div>
                </div>
                <div className="flex justify-between w-50">
                    <span className="bg-[#2D2D2D] rounded-md text-[#B3B3B3] text-xs px-3 py-1 justify-self-end">
                        Música
                    </span>
                    <div onClick={(event) => event.stopPropagation()} className="justify-self-center">
                        {musicData && (
                            <MusicOptionsButton
                            artistId={musicData.artistId}
                            albumId={musicData.albumId}
                            artistName={artistName}
                            musicId={musicId}/>
                        )}
                    </div>
                </div>
            </div>
            {contextMenu && musicData && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => event.stopPropagation()}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <MusicOptionsMenu
                    musicId={musicId}
                    albumId={musicData.albumId}
                    artistId={musicData.artistId}
                    artistName={artistName}
                    onClose={() => setContextMenu(null)}
                    onSelect={() => setContextMenu(null)}/>
                </div>
            )}
        </button>
    )
}
