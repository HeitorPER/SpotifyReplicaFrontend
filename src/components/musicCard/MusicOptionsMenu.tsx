import { useEffect, useRef, useState } from "react"
import { useFetch } from "../../hooks/useFetch"
import * as userService from "../../services/userService"
import * as playlistService from "../../services/PlaylistService"
import { ImagePlaceholder } from "../ImagePlaceholder";
import { BiSolidRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

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
        className={`flex items-center justify-start gap-2
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
        <div className="scrollable absolute left-full top-0 mr-2 w-56 max-h-72 overflow-y-auto
        bg-black rounded-lg shadow-lg p-2 flex flex-col gap-1 z-50">
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
        <div style={{ position: "fixed"}}
        className="bg-black flex-col rounded-lg">
            <div ref={containerRef} className="relative">
                <button
                className="flex items-center text-gray-400 hover:text-white
                cursor-pointer"
                onClick={handleOpenPlaylists}>
                    Adicionar a Playlist 
                    <BiSolidRightArrow/>
                </button>
                {isOpen  && <PlaylistsList
                            musicId={musicId}
                            onClose={onClose}/>}
            </div>
            
            <button
            onClick={handleClickDeleteFromPlaylist}
            className="flex items-center text-gray-400 hover:text-white
            cursor-pointer">
                    Remover dessa playlist
            </button>
            <button
            onClick={handleAddToFavorites}
            className="flex items-center text-gray-400 hover:text-white
            cursor-pointer">
                    Salvar em musicas curtidas
            </button>
            <h2>Remover da sua biblioteca </h2>

            <Link to={`/ArtistScreen/${artistId}`}
            className="flex items-center text-gray-400 hover:text-white
            cursor-pointer">Ir para artista</Link>
            <Link to={`/AlbumScreen/${albumId}`}
            className="flex items-center text-gray-400 hover:text-white
            cursor-pointer">Ir para album</Link>
            <h2>Ver Créditos</h2>
        </div>
    )
}