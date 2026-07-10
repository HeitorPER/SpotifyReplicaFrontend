import { createPlaylist } from "../../services/PlaylistService";
import type { Playlist } from "../../types/Playlist";

interface CreatePlaylistButtonProps {
    playlistCount: number;
    onCreated: (playlist: Playlist) => void;
}

export function CreatePlaylistButton({ playlistCount, onCreated }: CreatePlaylistButtonProps){
    const handleCreatePlaylist = async () => {
        const now = new Date().toISOString();
        const newPlaylist = {
            name: `Nova Playlist nº ${playlistCount + 1}`,
            description: "Descrição da nova playlist",
            duration: 0,
            musicQtd: 0,
            musics: [],
            createdAt: now,
            updatedAt: now,
        };
        const createdPlaylist = await createPlaylist(newPlaylist);
        onCreated(createdPlaylist);
        
    }

    return(
        <button onClick={handleCreatePlaylist} className="flex items-center justify-center gap-x-2
        py-1 border-gray-500 border-2 rounded-4xl text-white
        px-4 bg-transparent hover:border-white transition-colors duration-300
        ease-out cursor-pointer
        ">
            <h2 className="text-sm font-bold text-white">Criar playlist</h2>
        </button>
    )
}