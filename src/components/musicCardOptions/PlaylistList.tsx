import { useFetch } from "../../hooks/useFetch"
import * as userService from "../../services/userService"
import { ImagePlaceholder } from "../ImagePlaceholder";
import * as playlistService from "../../services/PlaylistService"

interface PlaylistButtonProps{
    imageUrl?: string;
    name: string;
    playlistId: string;
    musicId: string;
    onSelect: () => void;
};

function PlaylistsButton({imageUrl, name, playlistId, musicId, onSelect}:PlaylistButtonProps){

    async function handleClick(){
        await playlistService.addMusicToPlaylist(playlistId, musicId);
        onSelect();
    }

    return(
        <button 
        onClick={handleClick}
        className={`flex items-center justify-start gap-2 border border-[#1c1b1b]
        rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full`}>
            <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="playlist" />
                }
            </div>
            <div className="flex-col justify-start">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs justify-start flex">Playlist</span>
            </div>
        </button>
    )
}

export function PlaylistList({musicId, onClose}:{musicId: string; onClose: () => void}){
    const {data:Playlists} = useFetch(() => userService.getPlaylists(), [])

    return(
        <div className="scrollable absolute left-10 top-0 mr-2 w-56 max-h-72 overflow-y-auto
        bg-[#282828] rounded-lg shadow-lg p-2 flex flex-col gap-1 z-50">
            {Playlists?.length
            ?(Playlists.map((playlists) =>(
                <PlaylistsButton
                    key={playlists.id}
                    name={playlists.name}
                    playlistId={playlists.id}
                    musicId={musicId}
                    onSelect={onClose}
                />
            )))
            :
            (<h2>Nenhuma playlist</h2>)}
        </div>
    )
}