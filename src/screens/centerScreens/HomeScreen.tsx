import { PlaylistCard } from "../../components/playlistCards/PlaylistCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { ArtistsCard } from "../../components/ArtistsCard";
import { SelectionButton } from "../../components/SelectionButtons";
import { mockArtists } from "../../data/mockArtists";
import { mockPlaylists } from "../../data/mockPlaylists"
import { mockAlbums } from "../../data/mockAlbums";
import { AlbumCard } from "../../components/AlbunsCard";

interface ShelfProps {
    label: string
    children: React.ReactNode
}

function Shelf({ label, children }: ShelfProps) {
    return (
        <div className="flex flex-col gap-y-2">
            <h2 className="text-white font-semibold text-lg">{label}</h2>
            <div>{children}</div>
        </div>
    )
}

export default function HomeScreen() {
    return (
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-4 border-transparent
        bg-[#121212] py-6 px-5
        scrollbar-custom overflow-y-auto
        ">
            <div className="flex flex-col gap-y-2 w-full">
                <div className="flex gap-x-2">
                    <SelectionButton label="Tudo"/>
                    <SelectionButton label="Música"/>
                    <SelectionButton label="Playlists"/>
                </div>
                <div className="md:grid md:grid-cols-4 gap-2 grid grid-cols-2">
                    {mockPlaylists.slice(0, 8).map((playlist) => (
                        <PlaylistCard
                            key={playlist.playlist_id}
                            name={playlist.name}
                            compact
                        />
                    ))}
                </div>
            </div>

            <Shelf label="Suas Playlists">
                <div className="flex gap-x-3">
                    {mockPlaylists.slice(0, 4).map((playlist) => (
                        <PlaylistSquareCard name={playlist.name}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Artistas Recentes">
                <div className="flex gap-x-3">
                    {mockArtists.slice(0, 4).map((artist) => (
                        <ArtistsCard name={artist.artist_name}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Álbuns recentes">
                <div className="flex gap-x-3">
                    {mockAlbums.slice(0, 4).map((album) => (
                        <AlbumCard name={album.album_title}/>
                    ))}
                </div>
            </Shelf>
        </div>
    )
}