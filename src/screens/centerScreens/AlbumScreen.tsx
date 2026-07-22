import { useParams } from "react-router-dom";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/musicCards/MusicCard";
import * as albumService from "../../services/AlbumService";
import { useFetch } from "../../hooks/useFetch";
import { AlbumPlayButton } from "../../components/albumOptions/AlbumPlayButton";
import { AlbumOptionsButton } from "../../components/albumOptions/AlbumOptionsButton";

export default function AlbumScreen() {
    const { albumId } = useParams<{ albumId: string }>()
    const {data:album} = useFetch(() => albumService.getAlbumById(albumId as string), [albumId])
    const {data:albumSongs} = useFetch(() => albumService.getAlbumMusics(albumId as string), [albumId])

    if (!album) return null

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
                    <h2 className="text-sm text-gray-400">Album</h2>
                    <h2 className="font-bold text-5xl">{album.title}</h2>
                    <h2 className="text-sm text-gray-400">{album.artistName}</h2>
                    <h2 className="text-sm text-gray-400">{albumSongs?.length} músicas</h2>
                </div>
            </div>
            <div className="pl-4 flex w-full justify-start items-center gap-3">
                {album.musics && album.musics.length > 0 && (
                    <AlbumPlayButton 
                    musicId={album.musics[0].id}
                    albumId={album.id} />
                )}
                <AlbumOptionsButton
                    albumId={album.id}
                    artistId={album.artistId}/>
            </div>
            <div className="flex flex-col w-full py-6 px-5">
                <div className="flex flex-col">
                    {albumSongs?.map((song, index) => (
                        <MusicCard
                            key={song.id}
                            musicId={song.id}
                            title={song.title}
                            duration={song.duration}
                            artist={album.artistName}
                            explicit={song.explicit}
                            trackNumber={index + 1}
                            albumId={albumId as string}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
