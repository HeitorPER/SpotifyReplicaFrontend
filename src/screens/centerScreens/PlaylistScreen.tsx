import { useParams } from "react-router-dom";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/MusicCard";
import { getArtistName } from "../../data/mockArtists";
import * as playlistService from "../../services/PlaylistService";
import { useFetch } from "../../hooks/useFetch";

export default function PlaylistScreen() {
    const { playlistId } = useParams<{ playlistId: string }>();
    const { data: playlist } = useFetch(() => playlistService.getPlaylistById(playlistId as string), [playlistId]);
    if (!playlist) return null

    return (
        <div className="h-full w-full flex flex-col items-start
                border-2 rounded-lg text-gray-300
                gap-y-4 border-transparent
                bg-[#121212]
                scrollbar-custom overflow-y-auto">
            <div className="bg-linear-to-t from-gray-600 to-[#121212] flex w-full items-center gap-x-4 py-6 px-5">
                <div className="size-50 shrink-0 rounded overflow-hidden">
                    <ImagePlaceholder type="playlist" />
                </div>
                <div className="flex flex-col gap-y-1">
                    <h2 className="text-sm text-gray-400">Playlist</h2>
                    <h2 className="font-bold text-5xl">{playlist.name}</h2>
                    <h2 className="text-sm text-gray-400">{playlist.description}</h2>
                    <h2 className="text-sm text-gray-400">{playlist.musicQtd} músicas</h2>
                </div>
            </div>
            <div className="flex flex-col w-full py-6 px-5">
                <div className="flex flex-col">
                    {playlist.musics && playlist.musics.length > 0 ? (
                        playlist.musics.map((song, index) => (
                            <MusicCard
                                key={song.id}
                                musicId={song.id}
                                title={song.title}
                                artist={getArtistName(song.artistId)}
                                explicit={song.explicit}
                                trackNumber={index + 1}
                                playlistId={playlistId}
                            />
                        ))
                    ) : (
                        <>
                            <p className="text-gray-400">Nenhuma música adicionada ainda</p>
                            <p className="text-gray-400">Adicione músicas para começar</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
