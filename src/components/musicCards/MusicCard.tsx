import { ImagePlaceholder } from "../ImagePlaceholder"
import { usePlayer } from "../../context/PlayerContext"
import { useFetch } from "../../hooks/useFetch"
import * as artistService from "../../services/ArtistService"
import * as albumService from "../../services/AlbumService"
import { MusicOptionsButton } from "../musicCardOptions/OptionsButton"
import { MusicOptionsMenu } from "../musicCardOptions/MusicOptionsMenu"
import { useEffect, useRef, useState, type Ref } from "react"

export interface MusicCardProps {
    title: string
    artistId: string
    artistName?: string
    musicId: string
    explicit?: boolean
    imageUrl?: string
    trackNumber?: number
    playlistId?: string
    albumId: string
    duration: number
    isDragging?: boolean
}

export function MusicCard({ ref, duration, title, artistId, artistName, musicId, explicit = false, imageUrl, trackNumber, playlistId, albumId, isDragging = false }: MusicCardProps & { ref?: Ref<HTMLButtonElement> }) {
    const { play } = usePlayer();
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null);

    function timeconverter(duration: number){
        const minutes = Math.trunc(duration/60);
        const seconds = duration%60;
        return(<h2 className="text-gray-400 text-xs truncate text-right">{minutes}:{seconds}</h2>);
    }

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

    const { data: artistData } = useFetch(
            () => artistId ? artistService.getArtistById(artistId) : Promise.resolve(null),
            [artistId]
        );

        const { data: albumData } = useFetch(
            () => albumId ? albumService.getAlbumById(albumId) : Promise.resolve(null),
            [albumId]
        );

    return (
        <button
            ref={ref}
            type="button"
            onClick={() => play(musicId, { playlistId, albumId })}
            onContextMenu={handleContextMenu}
            className={`w-full text-left cursor-pointer ${isDragging ? "opacity-50" : ""}`}>
            <div className="grid grid-cols-[24px_4fr_2fr_2fr_50px_40px] items-center gap-x-4
            rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
                <span className="text-gray-400 text-sm text-center shrink-0">{trackNumber}</span>
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                        {imageUrl
                            ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                            : <ImagePlaceholder type="song" />
                        }
                    </div>
                    <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1">
                            <h2 className="text-white text-sm font-medium truncate">{title}</h2>
                            {explicit && (
                                <span className="text-[10px] bg-gray-500 text-gray-200 px-1 rounded shrink-0">E</span>
                            )}
                        </div>
                        <h2 className="text-gray-400 text-xs truncate">Música • {artistData?.name || artistName}</h2>
                    </div>
                </div>
                <h2 className="text-gray-400 text-xs truncate">{albumData?.title}</h2>
                <h2 className="text-gray-400 text-xs truncate">data de adição</h2>
                {timeconverter(duration)}
                <div onClick={(event) => event.stopPropagation()} className="justify-self-center">
                    <MusicOptionsButton
                    artistId={artistId}
                    artistName={artistData?.name || artistName || ""}
                    albumId={albumId}
                    musicId={musicId}
                    playlistId={playlistId}/>
                </div>
            </div>
            {contextMenu && (
                <div
                    ref={contextMenuRef}
                    onClick={(event) => event.stopPropagation()}
                    style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x }}
                    className="z-100">
                    <MusicOptionsMenu
                    musicId={musicId}
                    albumId={albumId}
                    artistName={artistData?.name || artistName || ""}
                    playlistId={playlistId}
                    artistId={artistId}
                    onClose={() => setContextMenu(null)}
                    onSelect={() => setContextMenu(null)}/>
                </div>
            )}
        </button>
    )
}
