import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { ImagePlaceholder } from "../ImagePlaceholder";
import * as playlistService from "../../services/PlaylistService"
import { IoLockClosedOutline } from "react-icons/io5";

interface PlaylistEditDetailsProps{
    playlistId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function PLaylistDeatilsEditPopup({playlistId, onClose, onSelect}:PlaylistEditDetailsProps){
    const { data: playlist } = useFetch(() => playlistService.getPlaylistById(playlistId as string), [playlistId]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(playlist?.name ?? "");
        setDescription(playlist?.description ?? "");
    }, [playlist]);

    async function handleSaveDetails(){
        playlistService.editPlaylistAttributes(playlistId, name, description);
        onSelect();
    }

    return(
        <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/40 backdrop-blur-sm">
            <div
            onClick={(e) => e.stopPropagation()}
            className="w-120 h-85
            bg-[#282828] rounded-lg shadow-lg p-5 flex flex-col gap-4">
                <h2 className="font-semibold text-white text-2xl">
                    Editar os detalhes
                </h2>
                <div className="flex w-full gap-3 flex-1 min-h-0">
                    <div className="w-50 h-50">
                        <ImagePlaceholder
                        type="playlist"/>
                    </div>
                    <div className="gap-2 flex flex-col h-full flex-1">
                        <input className="bg-[#3E3E3E] rounded-sm w-full h-10 shrink-0 px-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                        <textarea
                        className="bg-[#3E3E3E] rounded-sm w-full flex-1 px-2 py-1 resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="flex justify-between">
                    <button
                    className="flex items-center border border-gray-400 text-white rounded-3xl
                    px-2 cursor-pointer hover:border-white">
                        <IoLockClosedOutline/>
                        Tornar Privada
                    </button>
                    <button
                    onClick={handleSaveDetails}
                    className="bg-gray-100 text-black rounded-3xl
                    py-2 px-6 cursor-pointer hover:scale-105 duration-300">
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    )
}