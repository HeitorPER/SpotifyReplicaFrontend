import { PlaylistCard } from "../components/PlaylistCard";
import { CreatePlaylistButton } from "../components/leftBoard/CreatePlaylistButton";
import { SearchBar } from "../components/leftBoard/SearchBar";
import { SelectionButton } from "../components/leftBoard/SelectionButtons";
import { mockPlaylists } from "../data/mockPlaylists";

export function LeftBoard(){
    return(
        <div className="h-full flex flex-col items-start justify-start
        border-2 rounded-lg w-1/4 text-gray-300
        py-2 gap-y-2 border-transparent
        bg-[#121212]
        ">
            <div className="w-full border-b border-gradient-to-t via-[#121212]
            to-black pb-4 px-4 border-transparent">
                <div className="py-4 justify-between flex items-center">
                    <h2 className="text-lg font-bold text-white">Sua biblioteca</h2>
                    <CreatePlaylistButton />
                </div>
                <div className="flex justify-start gap-3">
                    <SelectionButton label="Tudo" />
                    <SelectionButton label="Playlist" />
                    <SelectionButton label="Álbuns" />
                    <SelectionButton label="Artistas" />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className="w-full flex-1 px-4">
                <div className="flex flex-col items-start justify-start py-2 gap-y-1">
                    {mockPlaylists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.playlist_id}
                            name={playlist.name}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
