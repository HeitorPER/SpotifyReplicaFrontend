import { useEffect, useRef, useState } from "react"
import {PlaylistList} from "./PlaylistList"
import * as playlistService from "../../services/PlaylistService"
import { BiSolidRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiPlus, FiPlusCircle, FiMinusCircle  } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { RiUserShared2Fill, RiFileList2Fill  } from "react-icons/ri";
import { BiDisc } from "react-icons/bi";
import { MusicCreditsPopUp } from "./MusicCreditsPopUp";

const LIKED_SONGS_PLAYLIST_ID = "bf08f708-dc79-4626-bb40-c8e64de7af51";

interface MusicOptions{
    musicId: string;
    playlistId?: string;
    artistName: string;
    artistId: string;
    albumId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function MusicOptionsMenu({artistName, albumId, artistId, musicId, playlistId, onSelect, onClose}: MusicOptions){
    const [isOpenPlaylistList, setIsOpenPlaylsitList] = useState(false);
    const [isOpenCredits, setIsOpenCredits] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpenPlaylsitList(false);
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
        setIsOpenPlaylsitList((prev) => !prev);
    }

    function handleOpenCredits(){
        setIsOpenCredits((prev) => !prev);
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
                {isOpenPlaylistList  && <PlaylistList
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

            <div className="relative">
                <button
                onClick={handleOpenCredits}
                className="flex items-center text-[#B3B3B3] hover:text-white
                cursor-pointer gap-2">
                    <RiFileList2Fill/>
                    Ver Créditos
                </button>
                {isOpenCredits && <MusicCreditsPopUp
                                    name={artistName}
                                    artistName={artistName}
                                    onClose={onClose}/>}
            </div>
        </div>
    )
}