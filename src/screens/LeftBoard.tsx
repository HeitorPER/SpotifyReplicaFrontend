import { PlaylistCard } from "../components/playlistCards/PlaylistCard";
import { CreatePlaylistButton } from "../components/leftBoard/CreatePlaylistButton";
import { SearchBar } from "../components/leftBoard/SearchBar";
import { SelectionButton } from "../components/SelectionButtons";
import { AlbumCard } from "../components/albumCards/AlbunsCard";
import * as userService from "../services/UserService";
import { useFetch } from "../hooks/useFetch";

export function LeftBoard(){
    const {data:playlists} = useFetch(() => userService.getPlaylists(), [])
    const {data:albums} = useFetch(() => userService.getRecentAlbums(), [])
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
                <div className="flex justify-start items-start gap-x-2">
                    <SelectionButton label="Tudo" />
                    <SelectionButton label="Playlist" />
                    <SelectionButton label="Álbuns" />
                    <SelectionButton label="Artistas" />
                </div>
                <div>
                    <SearchBar />
                </div>
            </div>
            <div className="w-full flex-1 min-h-0 px-4">
                <div className="h-full flex flex-col items-start justify-start py-2 gap-y-1 scrollbar-custom overflow-y-auto">
                    {playlists?.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            name={playlist.name}
                            playlistId={playlist.id}
                        />
                    ))}
                    {albums?.map((album) => (
                        <AlbumCard
                            key={album.id}
                            name={album.title}
                            albumId={album.id}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
