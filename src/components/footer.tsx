import { useSearchParams, useNavigate } from "react-router-dom";
import { mockArtists } from "../data/mockArtists";
import { mockSongs } from "../data/mockSongs";
import { mockPlaylistMusic } from "../data/mockPlaylistMusic";
import { MusicSmallCard } from "./footer/MusicSmallCard";
import { PlayTimer } from "./footer/PlayTimer";
import { useRef } from "react";

export function Footer(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const songId = searchParams.get("song");
    const playlistId = searchParams.get("playlist");
    const lastSongRef = useRef(mockSongs[0]);

    if (songId) {
        const found = mockSongs.find(s => s.music_id === songId);
        if (found) lastSongRef.current = found;
    }

    const currentSong = lastSongRef.current;
    const artist = mockArtists.find(a => a.artist_id === currentSong.artist) ?? mockArtists[0];

    const queue: string[] = playlistId
        ? mockPlaylistMusic
            .filter(pm => pm.playlist === playlistId)
            .map(pm => pm.songs)
        : [currentSong.music_id];

    const currentIndex = queue.indexOf(currentSong.music_id);

    function goTo(index: number) {
        const targetId = queue[index];
        if (!targetId) return;
        navigate(`?song=${targetId}${playlistId ? `&playlist=${playlistId}` : ""}`);
    }

    return(
        <div className="
         bg-[#000000] w-full h-100px flex items-center
         justify-between px-4 py-3">

                <div>
                    <MusicSmallCard
                        title={currentSong.title}
                        artist={artist.artist_name}
                        artistId={artist.artist_id}
                        musicName={currentSong.title}
                        albumId={currentSong.album}
                        explicit={currentSong.explicit}
                    />
                </div>
                <div>
                    <PlayTimer
                        musicId={currentSong.music_id}
                        duration={currentSong.duration}
                        onNext={currentIndex < queue.length - 1 ? () => goTo(currentIndex + 1) : undefined}
                        onPrev={currentIndex > 0 ? () => goTo(currentIndex - 1) : undefined}
                    />
                </div>
                <div>
                    {/*volume, full screen*/}
                </div>

        </div>
    )
}