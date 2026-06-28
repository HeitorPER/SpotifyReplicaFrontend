import { useSearchParams } from "react-router-dom";
import { mockArtists } from "../data/mockArtists";
import { mockSongs } from "../data/mockSongs";
import { MusicSmallCard } from "./footer/MusicSmallCard";
import { PlayTimer } from "./footer/PlayTimer";
import { useRef } from "react";

export function Footer(){
    const [searchParams] = useSearchParams();
    const songId = searchParams.get("song");
    const lastSongRef = useRef(mockSongs[0]);

    if (songId) {
        const found = mockSongs.find(s => s.music_id === songId);
        if (found) lastSongRef.current = found;
    }

    const currentSong = lastSongRef.current;
    const artist = mockArtists.find(a => a.artist_id === currentSong.artist) ?? mockArtists[0];
    
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
                    <PlayTimer/>

                </div>
                <div>
                    {/*volume, full screen*/}

                </div>
           
        </div>
    )
}