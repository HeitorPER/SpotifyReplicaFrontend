import { PlaylistCard } from "../components/PlaylistCard";
import { SearchBar } from "../components/leftBoard/SearchBar";
import { SelectionButton } from "../components/leftBoard/SelectionButtons";

export function LeftBoard(){
    return(
        <div className="h-full flex flex-col items-start justify-start
        px-4 border-gray-500  border-2 rounded-lg w-1/4 text-gray-300
        py-2 gap-y-4
        ">
            <div className="w-full border-b border-gray-500">
                <div className="py-4">
                    <h2>Sua biblioteca</h2>
                </div>
                <div className="flex justify-between gap-2">
                    <SelectionButton label="Tudo" />
                    <SelectionButton label="Playlist" />
                    <SelectionButton label="Álbuns" />
                    <SelectionButton label="Artistas" />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className="w-full flex-1">
                <div className="flex flex-col items-start justify-start py-2 gap-y-1">
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                </div>
            </div>
        </div>
    )
}