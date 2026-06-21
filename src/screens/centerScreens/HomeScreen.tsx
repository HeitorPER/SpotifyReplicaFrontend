import { PlaylistCard } from "../../components/PlaylistCard";
import { SelectionButton } from "../../components/SelectionButtons";
import {mockPlaylists} from "../../data/mockPlaylists"

export default function HomeScreen(){
    return(
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-2 border-transparent
        bg-[#121212] py-6 px-5
        ">  
            <div className="flex flex-col gap-y-2">
                <div className="flex gap-x-2">
                    <SelectionButton label="Tudo"/>
                    <SelectionButton label="Música"/>
                    <SelectionButton label="Playlists"/>
                </div>
                <div className="md:grid md:grid-cols-4 gap-2
                grid grid-cols-2">
                {mockPlaylists.slice(0, 8).map((playlist) => (
                    <PlaylistCard
                        key={playlist.playlist_id}
                        name={playlist.name}
                        compact
                    />
                ))}
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}