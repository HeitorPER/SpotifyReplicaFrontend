import { PlaylistCard } from "../../components/playlistCards/PlaylistCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { SelectionButton } from "../../components/SelectionButtons";
import { AlbumCard } from "../../components/albumCards/AlbunsSquareCard";
import {Shelf} from "../../components/SelfModel";
import { useFetch } from "../../hooks/useFetch";
import * as userService from "../../services/userService.ts"



export default function HomeScreen() {
    const { data: userPlaylists } = useFetch(userService.getPlaylists);
    const { data: recentArtists } = useFetch(userService.getRecentArtists);
    const { data: recentAlbums } = useFetch(userService.getRecentAlbums);

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
                    {userPlaylists?.slice(0, 8).map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            name={playlist.name}
                            playlistId={playlist.id}
                            compact
                        />
                    ))}
                </div>
            </div>

            <Shelf label="Suas Playlists">
                <div className="flex gap-x-3">
                    {userPlaylists?.slice(0, 4).map((playlist) => (
                        <PlaylistSquareCard key={playlist.id} name={playlist.name} playlistId={playlist.id}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Artistas Recentes">
                <div className="flex gap-x-3">
                    {recentArtists?.slice(0, 4).map((artist) => (
                        <ArtistsCardRounded key={artist.id} name={artist.name} artistId={artist.id}/>
                    ))}
                </div>
            </Shelf>
            <Shelf label="Álbuns recentes">
                <div className="flex gap-x-3">
                    {recentAlbums?.slice(0, 4).map((album) => (
                        <AlbumCard key={album.album_id} name={album.title} albumId={album.album_id}/>
                    ))}
                </div>
            </Shelf>
        </div>
    )
}