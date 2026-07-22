import { useState } from "react";
import { PlaylistCard } from "../../components/playlistCards/PlaylistCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { ArtistsCardRounded } from "../../components/ArtistsCards/ArtistsCardRounded";
import { SelectionButton } from "../../components/SelectionButtons";
import { AlbumSquareCard } from "../../components/albumCards/AlbunsSquareCard";
import {Shelf} from "../../components/SelfModel";
import { useFetch } from "../../hooks/useFetch";
import * as userService from "../../services/userService.ts"

type FilterType = "all" | "music" | "playlist";

const FILTERS: { type: FilterType; label: string }[] = [
    { type: "all", label: "Tudo" },
    { type: "music", label: "Música" },
    { type: "playlist", label: "Playlists" },
];

export default function HomeScreen() {
    const { data: userPlaylists } = useFetch(userService.getPlaylists);
    const { data: recentArtists } = useFetch(userService.getRecentArtists);
    const { data: recentAlbums } = useFetch(userService.getRecentAlbums);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const showPlaylists = activeFilter === "all" || activeFilter === "playlist";
    const showMusic = activeFilter === "all" || activeFilter === "music";

    return (
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-4 border-transparent
        bg-[#121212] py-6 px-5
        scrollbar-custom overflow-y-auto
        ">
            <div className="flex flex-col gap-y-2 w-full">
                <div className="flex gap-x-2">
                    {FILTERS.map(({ type, label }) => (
                        <SelectionButton
                            key={type}
                            label={label}
                            selected={activeFilter === type}
                            onClick={() => setActiveFilter(type)}
                        />
                    ))}
                </div>
                {showPlaylists && (
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
                )}
            </div>

            {showPlaylists && (
                <Shelf label="Suas Playlists">
                    <div className="flex gap-x-3">
                        {userPlaylists?.slice(0, 4).map((playlist) => (
                            <PlaylistSquareCard key={playlist.id} name={playlist.name} playlistId={playlist.id}/>
                        ))}
                    </div>
                </Shelf>
            )}
            {showMusic && (
                <Shelf label="Artistas Recentes">
                    <div className="flex gap-x-3">
                        {recentArtists?.slice(0, 4).map((artist) => (
                            <ArtistsCardRounded key={artist.id} name={artist.name} artistId={artist.id}/>
                        ))}
                    </div>
                </Shelf>
            )}
            {showMusic && (
                <Shelf label="Álbuns recentes">
                    <div className="flex gap-x-3">
                        {recentAlbums?.slice(0, 4).map((album) => (
                            <AlbumSquareCard key={album.id} name={album.title} albumId={album.id}/>
                        ))}
                    </div>
                </Shelf>
            )}
        </div>
    )
}