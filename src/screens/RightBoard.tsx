import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArtistCard } from "../components/RightBoard/ArtistCard";
import { CreditsCard } from "../components/RightBoard/CreditsCard";
import { MusicImage } from "../components/RightBoard/MusicImage";
import { EventsCard } from "../components/RightBoard/EventsCard";
import { mockArtists, getArtistName } from "../data/mockArtists";
import { mockSongs } from "../data/mockSongs";
import { NextMusicCard } from "../components/RightBoard/NextMusicCard";

export function RightBoard(){
    const [searchParams] = useSearchParams();
    const songId = searchParams.get("song");
    const lastSongRef = useRef(mockSongs[0]);

    if (songId) {
        const found = mockSongs.find(s => s.music_id === songId);
        if (found) lastSongRef.current = found;
    }

    const currentSong = lastSongRef.current;
    const artist = mockArtists.find(a => a.id === currentSong.artist) ?? mockArtists[0];
    const currentIndex = mockSongs.findIndex(s => s.music_id === currentSong.music_id);
    const nextSong = mockSongs[(currentIndex + 1) % mockSongs.length];

    return(
        <div className="flex flex-col items-center justify-start px-4
        bg-[#121212] border border-transparent rounded-lg w-1/4 text-gray-300
        overflow-y-auto h-full scrollbar-custom gap-y-3
        pb-3
        ">
            <div className="w-full py-4 justify-between flex items-center">
                <h1 className="text-xl font-bold">{artist.name}</h1>
                <button
                className="text-white text-sm border border-transparent
                rounded-lg px-3 py-1 hover:bg-gray-700 transition-colors cursor-pointer">
                    ...
                </button>
            </div>
            <div className="w-full">
                <MusicImage
                    title={currentSong.title}
                    artist={artist.name}
                />
            </div>
            <div className="w-full flex-1">
                <ArtistCard
                    artist_name={artist.name}
                    artist_id={artist.id}
                    num_listeners={artist.listeners}
                    about={artist.about}
                />
            </div>
            <div className="w-full flex-1">
                <CreditsCard
                    artist_name={artist.name}
                />
            </div>
            <div className="w-full">
                <EventsCard/>
            </div>
            <div className="w-full">
                <NextMusicCard
                    title={nextSong.title}
                    artist={getArtistName(nextSong.artist)}
                    explicit={nextSong.explicit}
                />
            </div>
        </div>
    )
}
