import { useParams } from "react-router-dom";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/musicCards/MusicCard";
import * as playlistService from "../../services/PlaylistService";
import { useFetch } from "../../hooks/useFetch";
import { LuClock3 } from "react-icons/lu";
import { PlaylistOptionsButton } from "../../components/playlistOptions/PlaylistOptionsButton";
import { PlaylistPlayButton } from "../../components/playlistOptions/PlaylistPlayButton";

export default function PlaylistScreen() {
    const { playlistId } = useParams<{ playlistId: string }>();
    const { data: playlist } = useFetch(() => playlistService.getPlaylistById(playlistId as string), [playlistId]);
    if (!playlist) return null

    return (
        <div className="h-full w-full flex flex-col items-start
                border-2 rounded-lg text-gray-300
                gap-y-2 border-transparent
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
            <div className="pl-4 flex w-full justify-start items-center gap-3">
                {playlist.musics && playlist.musics.length > 0 && (
                    <PlaylistPlayButton musicId={playlist.musics[0].music.id}
                    playlistId={playlist.id} />
                )}
                <PlaylistOptionsButton
                name={playlist.name}
                playlistId={playlist.id}/>
            </div>
            <div className="grid grid-cols-[24px_4fr_2fr_2fr_50px_40px] items-center
             px-7 gap-x-4 w-full text-[10px]">
                <h2 className="text-center">#</h2>
                <h2>Título</h2>
                <h2>Álbum</h2>
                <h2>Adicionada em</h2>
                <LuClock3 className="mx-auto"/>
                <div className="col-span-6 border-b border-[#4E4E4E] mt-2"/>
            </div>
            <div className="flex flex-col w-full pb-3 px-5">
                <div className="flex flex-col">
                    {playlist.musics && playlist.musics.length > 0 ? (
                        playlist.musics.map(({ position, music }) => (
                            <MusicCard
                                key={music.id}
                                musicId={music.id}
                                title={music.title}
                                albumId={music.albumId}
                                duration={music.duration}
                                artist={music.artistId}
                                explicit={music.explicit}
                                trackNumber={position + 1}
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
