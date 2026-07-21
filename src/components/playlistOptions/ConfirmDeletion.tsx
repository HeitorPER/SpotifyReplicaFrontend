import * as playlistService from "../../services/PlaylistService"

interface ConfimDeletionProps{
    name: string;
    playlistId: string;
    onClose: () => void;
    onSelect: () => void;
}

export function ConfirmDeletion({name, playlistId, onClose, onSelect}:ConfimDeletionProps){

    function handleDeletePLaylist(){
        playlistService.deletePlaylistById(playlistId);
        onSelect();
    }

    return(
         <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm">
                <div
                onClick={(e) => e.stopPropagation()}
                className="w-120 h-40
                bg-white rounded-lg shadow-lg p-5 flex flex-col gap-4">
                    <h2 className="font-semibold text-black text-2xl">
                        Apagar da sua biblioteca?
                    </h2>
                    <h2 className="text-black text-md">
                        A playlist {name} será excluída da sua biblioteca.
                    </h2>
                    <div className="flex justify-end gap-2">
                        <button
                        onClick={onClose}
                        className="flex items-center border border-white text-black rounded-3xl
                        px-2 cursor-pointer hover:border-gray-400">
                            Cancelar
                        </button>
                        <button
                        onClick={handleDeletePLaylist}
                        className="bg-red-600 text-white rounded-3xl
                        py-2 px-6 cursor-pointer hover:scale-105 duration-300">
                            Apagar
                        </button>
                    </div>
                </div>
            </div>
        
    )
}