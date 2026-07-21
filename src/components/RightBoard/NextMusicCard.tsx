import { ImagePlaceholder } from "../ImagePlaceholder"
import { usePlayer } from "../../context/PlayerContext"
import { useFetch } from "../../hooks/useFetch"
import * as artistService from "../../services/ArtistService"
import { MusicOptionsButton } from "../musicCardOptions/OptionsButton"

interface NextMusicCardProps {
    musicId: string
    title: string
    artist: string
    explicit?: boolean
    imageUrl?: string
    playlistId?: string
    albumId?: string
    duration: number
}

export function NextMusicCard({ musicId, title, artist, explicit = false, imageUrl, playlistId, albumId, duration }: NextMusicCardProps) {
    const { play } = usePlayer();

    function timeconverter(duration: number){
        const minutes = Math.trunc(duration/60);
        const seconds = duration%60;
        return(<h2 className="text-gray-400 text-xs truncate text-right">{minutes}:{seconds}</h2>);
    }

    const { data: artistData } = useFetch(
        () => artist ? artistService.getArtistById(artist) : Promise.resolve(null),
        [artist]
    );

    return (
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        border-t border-transparent rounded-lg w-full text-gray-300
        cursor-pointer gap-2 py-3 px-5">
            <div className="justify-start flex items-start w-full">
                <h2 className="font-bold text-white">A seguir</h2>
            </div>
            <button
                type="button"
                onClick={() => play(musicId, { playlistId, albumId })}
                className="w-full text-left cursor-pointer">
                <div className="flex items-center gap-2
                rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
                    <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                        {imageUrl
                            ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                            : <ImagePlaceholder type="song" />
                        }
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                            <h2 className="text-white text-sm font-medium truncate">{title}</h2>
                            {explicit && (
                                <span className="text-[10px] bg-gray-500 text-gray-200 px-1 rounded shrink-0">E</span>
                            )}
                        </div>
                        <h2 className="text-gray-400 text-xs truncate">Música • {artistData?.name || artist}</h2>
                    </div>
                    {timeconverter(duration)}
                    <div onClick={(event) => event.stopPropagation()} className="shrink-0">
                        <MusicOptionsButton
                        musicId={musicId}
                        artistId={artist}
                        albumId={albumId ?? ""}
                        playlistId={playlistId}/>
                    </div>
                </div>
            </button>
        </div>
    )
}
