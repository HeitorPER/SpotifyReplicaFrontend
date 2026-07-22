import { useEffect, useRef, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import * as userService from "../../services/userService"
import * as playlistService from "../../services/PlaylistService"
import { ImagePlaceholder } from "../ImagePlaceholder";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiPlus, FiPlusCircle, FiMinusCircle  } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { RiUserShared2Fill, RiFileList2Fill  } from "react-icons/ri";
import { BiDisc } from "react-icons/bi";

const LIKED_SONGS_PLAYLIST_ID = "bf08f708-dc79-4626-bb40-c8e64de7af51";

interface PlaylistButtonProps{
    imageUrl?: string;
    name: string;
    playlistId: string;
    musicId: string;
    onSelect: () => void;
};

interface MusicOptions{
    musicId: string;
    playlistId?: string;
    artistId: string;
    albumId: string;
    onClose: () => void;
    onSelect: () => void;
}

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

function PlaylistsList({musicId, onClose}:{musicId: string; onClose: () => void}){
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

export function MusicOptionsMenu({albumId, artistId, musicId, playlistId, onSelect, onClose}: MusicOptions){
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

    async function handleAddToFavorites(){
        await playlistService.addMusicToPlaylist(LIKED_SONGS_PLAYLIST_ID, musicId);
        onSelect();
    }

    function handleOpenPlaylists(){
        setIsOpen((prev) => !prev);
    }

    async function handleClickDeleteFromPlaylist(){
        if(!playlistId) return;

        await playlistService.deleteMusicById(playlistId, musicId);
        onSelect();
    }
    
    return(
        <div
        className="flex bg-[#282828] flex-col rounded-lg px-4 py-2 gap-y-2">
            <div ref={containerRef} className="relative">
                <button
                className="flex items-center text-[#B3B3B3] hover:text-white
                cursor-pointer gap-2"
                onClick={handleOpenPlaylists}>
                    <FiPlus/>
                    Adicionar à Playlist 
                    <BiSolidRightArrow/>
                </button>
                {isOpen  && <PlaylistsList
                            musicId={musicId}
                            onClose={onClose}/>}
            </div>
            
            {playlistId &&
            <button
            onClick={handleClickDeleteFromPlaylist}
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <FiMinusCircle/>
                    Remover dessa playlist
            </button>}
            <button
            onClick={handleAddToFavorites}
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <FiPlusCircle/>
                    Salvar em musicas curtidas
            </button>
            <h2 className="flex items-center gap-2">
                <FaCheckCircle/>
                Remover da sua biblioteca 
            </h2>
            <div className="border border-gray-500"/>

            <Link to={`/ArtistScreen/${artistId}`}
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <RiUserShared2Fill/>
                Ir para artista</Link>
            <Link to={`/AlbumScreen/${albumId}`}
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <BiDisc/>
                Ir para album</Link>
            <h2 className="flex items-center text-[#B3B3B3]
            cursor-pointer gap-2">
                <RiFileList2Fill/>
                Ver Créditos
            </h2>
        </div>
    )
}