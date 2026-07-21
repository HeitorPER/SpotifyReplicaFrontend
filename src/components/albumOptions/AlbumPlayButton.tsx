import { IoMdPlayCircle } from "react-icons/io";
import { usePlayer } from "../../context/PlayerContext";

interface AlbumPlayButtonProps{
    musicId: string;
    playlistId?: string;
    albumId?: string;

}

export function AlbumPlayButton({musicId, playlistId, albumId}:AlbumPlayButtonProps){
    const { play } = usePlayer();

    return(
        <button className="cursor-pointer"
        type="button"
        onClick={() => play(musicId, { playlistId, albumId })}>
            <IoMdPlayCircle
            className="text-green-500 w-10 h-10 hover:scale-110 duration-300"/>
        </button>
    )
}