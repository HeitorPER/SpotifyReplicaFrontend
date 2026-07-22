import { MusicSmallCard } from "./footer/MusicSmallCard";
import { PlayTimer } from "./footer/PlayTimer";
import { Volume } from "./footer/volume";
import { useState } from "react";
import { FullScreen } from "./footer/FullScreen";
import { FullMusicScreen } from "../screens/FullMusicScreen";
import { useFetch } from "../hooks/useFetch";
import { usePlayer } from "../context/PlayerContext";
import * as musicService from "../services/MusicService";
import * as artistService from "../services/ArtistService";
import * as albumService from "../services/AlbumService";
import * as playlistService from "../services/PlaylistService";

export function Footer(){
    const { songId, playlistId, albumId, play } = usePlayer();
    const [isFullScreenOpen, setFullScreenOpen] = useState(false);

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
    
        const queueMusics = playlist?.musics?.map(({ music }) => music) ?? album?.musics ?? [];
        const currentQueueIndex = currentSong
            ? queueMusics.findIndex((m) => m.id === currentSong.id)
            : -1;
    
    function goTo(index: number) {
        const targetId = queueMusics[index]?.id;
        if (!targetId) return;
        play(targetId, { playlistId: playlistId ?? undefined, albumId: albumId ?? undefined });
    }

    return(
        <>
            {isFullScreenOpen && (
                currentSong ? (
                    <FullMusicScreen
                        musicId={currentSong?.id}
                    />
                ) : (
                    <h2 className="flex text-gray-300 justify-center items-center">nenhuma musica tocando no momento</h2>
                )
            )}

            <div className="relative z-50 bg-[#000000] w-full h-100px flex items-center justify-between px-4 py-3">
                {currentSong && artist ? (
                <div>
                    <MusicSmallCard
                        title={currentSong?.title}
                        artist={artist?.name}
                        artistId={artist?.id}
                        musicName={currentSong?.title}
                        albumId={currentSong?.albumId}
                        explicit={currentSong?.explicit}
                    />
                </div>
                ):(
                    <h2 className="text-gray-400">Nenhuma música selecionada</h2>
                )
                }
                {currentSong ? (
                    <div>
                        <PlayTimer
                            musicId={currentSong?.id}
                            duration={currentSong?.duration}
                            onNext={currentQueueIndex < queueMusics.length - 1 ? () => goTo(currentQueueIndex + 1) : undefined}
                        onPrev={currentQueueIndex > 0 ? () => goTo(currentQueueIndex - 1) : undefined}
                    />
                </div>
                ):(
                    <h2 className="text-gray-400">Nenhuma música selecionada</h2>
                )}
                <div className="flex gap-3 items-center">
                    <Volume/>
                    <FullScreen
                        isOpen={isFullScreenOpen}
                        onToggle={() => setFullScreenOpen(prev => !prev)}
                    />
                </div>
            </div>
        </>
    )
}