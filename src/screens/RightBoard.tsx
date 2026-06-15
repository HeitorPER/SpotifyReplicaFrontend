import { ArtistCard } from "../components/RightBoard/ArtistCard";
import { CreditsCard } from "../components/RightBoard/CreditsCard";
import { MusicImage } from "../components/RightBoard/MusicImage";
import { EventsCard } from "../components/RightBoard/EventsCard";
import { mockArtists, getArtistName } from "../data/mockArtists";
import { mockSongs } from "../data/mockSongs";
import { NextMusicCard } from "../components/RightBoard/NextMusicCard";

export function RightBoard(){
    const song = mockSongs[0];
    const artist = mockArtists[0];

    return(
        <div className="flex flex-col items-center justify-start px-4
        bg-[#121212] border border-transparent rounded-lg w-1/4 text-gray-300
        overflow-y-auto h-full scrollbar-custom gap-y-3
        pb-3
        ">
            <div className="w-full py-4 justify-between flex items-center">
                <h1 className="text-xl font-bold">{artist.artist_name}</h1>
                <button
                className="text-white text-sm border border-transparent
                rounded-lg px-3 py-1 hover:bg-gray-700 transition-colors cursor-pointer">
                    ...
                </button>
            </div>
            <div className="w-full">
                <MusicImage
                    title={song.title}
                    artist={artist.artist_name}
                />
            </div>
            <div className="w-full flex-1">
                <ArtistCard
                    artist_name={artist.artist_name}
                    num_listeners={artist.num_listeners}
                    about={artist.about}
                />
            </div>
            <div className="w-full flex-1">
                <CreditsCard
                    artist_name={artist.artist_name}
                />
            </div>
            <div className="w-full">
                <EventsCard/>
            </div>
            <div className="w-full">
                <NextMusicCard
                    title={mockSongs[1].title}
                    artist={getArtistName(mockSongs[1].artist)}
                    explicit={mockSongs[1].explicit}
                />
            </div>
        </div>
    )
}
