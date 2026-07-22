import { IoMdPlayCircle } from "react-icons/io";
import { usePlayer } from "../../context/PlayerContext";

interface ArtistPlayButtonProps{
    musicId: string;
    playlistId?: string;
    albumId?: string;

}

export function ArtistPlayButton({musicId, playlistId, albumId}:ArtistPlayButtonProps){
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