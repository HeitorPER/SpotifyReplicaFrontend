import { ArtistCard } from "../components/RightBoard/ArtistCard";
import { CreditsCard } from "../components/RightBoard/CreditsCard";
import { MusicImage } from "../components/RightBoard/MusicImage";
import { EventsCard } from "../components/RightBoard/EventsCard";
import { NextMusicCard } from "../components/RightBoard/NextMusicCard";
import { useFetch } from "../hooks/useFetch";
import { usePlayer } from "../context/PlayerContext";
import * as musicService from "../services/MusicService";
import * as artistService from "../services/ArtistService";
import * as albumService from "../services/AlbumService";
import * as playlistService from "../services/PlaylistService";

export function RightBoard(){
    const { songId, playlistId, albumId } = usePlayer();

    const { data: currentSong } = useFetch(
        () => songId ? musicService.getMusicById(songId) : Promise.resolve(null),
        [songId]
    );

    const artistId = currentSong?.artistId ?? null;
    const { data: artist } = useFetch(
        () => artistId ? artistService.getArtistById(artistId) : Promise.resolve(null),
        [artistId]
    );

    const { data: playlist } = useFetch(
        () => playlistId ? playlistService.getPlaylistById(playlistId) : Promise.resolve(null),
        [playlistId]
    );

    const { data: album } = useFetch(
        () => albumId ? albumService.getAlbumById(albumId) : Promise.resolve(null),
        [albumId]
    );

    const queueMusics = album?.musics ?? playlist?.musics ?? [];
    const currentQueueIndex = currentSong
        ? queueMusics.findIndex((m) => m.id === currentSong.id)
        : -1;
    const nextSong = currentQueueIndex >= 0
        ? queueMusics[(currentQueueIndex + 1) % queueMusics.length]
        : undefined;

    const nextArtistId = !album && nextSong ? nextSong.artistId : null;
    const { data: nextArtist } = useFetch(
        () => nextArtistId ? artistService.getArtistById(nextArtistId) : Promise.resolve(null),
        [nextArtistId]
    );
    const nextArtistName = album ? album.artistName : nextArtist?.name;

    return(
        <div className="flex flex-col items-center justify-start px-4
        bg-[#121212] border border-transparent rounded-lg w-1/4 text-gray-300
        overflow-y-auto h-full scrollbar-custom gap-y-3
        pb-3
        ">
            <div className="w-full py-4 justify-between flex items-center">
                <h1 className="text-xl font-bold">{artist?.name ?? "Nada tocando"}</h1>
                <button
                className="text-white text-sm border border-transparent
                rounded-lg px-3 py-1 hover:bg-gray-700 transition-colors cursor-pointer">
                    ...
                </button>
            </div>
            <div className="w-full">
                <MusicImage
                    title={currentSong?.title ?? "Nenhuma música tocando"}
                    artist={artist?.name ?? ""}
                />
            </div>
            {currentSong && artist && (
                <div className="w-full flex-1">
                    <ArtistCard
                        artist_name={artist.name}
                        artist_id={artist.id}
                        num_listeners={artist.listeners}
                        about={artist.about}
                    />
                </div>
            )}
            {currentSong && artist && (
                <div className="w-full flex-1">
                    <CreditsCard
                        artist_name={artist.name}
                    />
                </div>
            )}
            <div className="w-full">
                <EventsCard/>
            </div>
            {nextSong && nextArtistName && (
                <div className="w-full">
                    <NextMusicCard
                        musicId={nextSong.id}
                        title={nextSong.title}
                        artist={nextArtistName}
                        explicit={nextSong.explicit}
                        playlistId={playlistId ?? undefined}
                        albumId={albumId ?? undefined}
                    />
                </div>
            )}
        </div>
    )
}
