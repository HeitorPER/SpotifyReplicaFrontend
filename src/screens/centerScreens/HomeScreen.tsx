import { PlaylistCard } from "../../components/playlistCards/PlaylistCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { SelectionButton } from "../../components/SelectionButtons";
import { mockArtists } from "../../data/mockArtists";
import { mockPlaylists } from "../../data/mockPlaylists"
import { mockAlbums } from "../../data/mockAlbums";
import { AlbumCard } from "../../components/albumCards/AlbunsSquareCard";
import {Shelf} from "../../components/SelfModel";



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
                            playlistId={playlist.playlist_id}
                            compact
                        />
                    ))}
                </div>
            </div>

            <Shelf label="Suas Playlists">
                <div className="flex gap-x-3">
                    {mockPlaylists.slice(0, 4).map((playlist) => (
                        <PlaylistSquareCard key={playlist.playlist_id} name={playlist.name} playlistId={playlist.playlist_id}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Artistas Recentes">
                <div className="flex gap-x-3">
                    {mockArtists.slice(0, 4).map((artist) => (
                        <ArtistsCardRounded key={artist.artist_id} name={artist.artist_name} artistId={artist.artist_id}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Álbuns recentes">
                <div className="flex gap-x-3">
                    {mockAlbums.slice(0, 4).map((album) => (
                        <AlbumCard key={album.album_id} name={album.album_title} albumId={album.album_id}/>
                    ))}
                </div>
            </Shelf>
        </div>
    )
}