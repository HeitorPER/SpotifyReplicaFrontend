import { FaCheckCircle } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { RiUserShared2Fill } from "react-icons/ri";
import { TbPinFilled } from "react-icons/tb";
import { Link } from "react-router-dom";

interface AlbumOptionsProps{
    artistId:string;
    albumId: string;
}

export function AlbumOptionsMenu({artistId}:AlbumOptionsProps){
  return(
        <div className="flex w-65 bg-[#282828] flex-col rounded-lg px-4 py-2 gap-y-2">
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <FiPlusCircle/>
                Adicionar à sua biblioteca
            </button>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <FaCheckCircle/>
                Remover da sua biblioteca
            </button>
            <button
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <TbPinFilled/>
                Fixar álbum
            </button>
            <h2 className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <TbPinFilled/>
                Remover pin do álbum 
            </h2>
            <Link to={`/ArtistScreen/${artistId}`}
            className="flex items-center text-[#B3B3B3] hover:text-white
            cursor-pointer gap-2">
                <RiUserShared2Fill/>
                Ir para artista
            </Link>
        </div>
    )
}