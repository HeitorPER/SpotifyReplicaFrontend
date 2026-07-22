import { useEffect, useState } from "react";
import { PlaylistCard } from "../components/playlistCards/PlaylistCard";
import { CreatePlaylistButton } from "../components/leftBoard/CreatePlaylistButton";
import { SearchBar } from "../components/leftBoard/SearchBar";
import { SelectionButton } from "../components/SelectionButtons";
import { AlbumCard } from "../components/albumCards/AlbunsCard";
import { ArtistCard } from "../components/artistCards/ArtistCard";
import * as userService from "../services/userService";
import { useFetch } from "../hooks/useFetch";
import type { Playlist } from "../types/Playlist";

type FilterType = "all" | "playlist" | "album" | "artist";

const FILTERS: { type: FilterType; label: string }[] = [
    { type: "all", label: "Tudo" },
    { type: "playlist", label: "Playlist" },
    { type: "album", label: "Álbuns" },
    { type: "artist", label: "Artistas" },
];

export function LeftBoard(){
    const {data:Playlists} = useFetch(() => userService.getPlaylists(), [])
    const {data:albums} = useFetch(() => userService.getRecentAlbums(), [])
    const {data:artists} = useFetch(() => userService.getRecentArtists(), [])
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (Playlists) setPlaylists(Playlists);
    }, [Playlists]);

    const handlePlaylistCreated = (playlist: Playlist) => {
        setPlaylists((prev) => [...prev, playlist]);
    };

    const normalizedQuery = searchQuery.trim().toLowerCase();
    const matchQuery = (name: string) => name.toLowerCase().includes(normalizedQuery);

    const showPlaylists = activeFilter === "all" || activeFilter === "playlist";
    const showAlbums = activeFilter === "all" || activeFilter === "album";
    const showArtists = activeFilter === "all" || activeFilter === "artist";

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
                    <CreatePlaylistButton
                        playlistCount={playlists.length}
                        onCreated={handlePlaylistCreated}
                    />
                </div>
                <div className="flex justify-start items-start gap-x-2">
                    {FILTERS.map(({ type, label }) => (
                        <SelectionButton
                            key={type}
                            label={label}
                            selected={activeFilter === type}
                            onClick={() => setActiveFilter(type)}
                        />
                    ))}
                </div>
                <div>
                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </div>
            </div>
            <div className="w-full flex-1 min-h-0 px-4">
                <div className="h-full flex flex-col items-start justify-start py-2 gap-y-1 scrollbar-custom overflow-y-auto">
                    {showPlaylists && playlists
                        .filter((playlist) => matchQuery(playlist.name))
                        .map((playlist) => (
                            <PlaylistCard
                                key={playlist.id}
                                name={playlist.name}
                                playlistId={playlist.id}
                            />
                        ))}
                    {showAlbums && albums
                        ?.filter((album) => matchQuery(album.title))
                        .map((album) => (
                            <AlbumCard
                                key={album.id}
                                name={album.title}
                                albumId={album.id}
                            />
                        ))}
                    {showArtists && artists
                        ?.filter((artist) => matchQuery(artist.name))
                        .map((artist) => (
                            <ArtistCard
                                key={artist.id}
                                name={artist.name}
                                artistId={artist.id}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}