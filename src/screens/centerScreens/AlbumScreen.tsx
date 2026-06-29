import { useParams } from "react-router-dom";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/MusicCard";
import { mockAlbums } from "../../data/mockAlbums";
import {mockAlbumMusic} from "../../data/mockAlbumMusic"
import { mockSongs } from "../../data/mockSongs";
import { getArtistName } from "../../data/mockArtists";

export default function AlbumScreen() {
    const { albumId } = useParams<{ albumId: string }>()
    const album = mockAlbums.find(p => p.album_id === albumId)
    const albumSongIds = mockAlbumMusic
        .filter(pm => pm.album === albumId)
        .map(pm => pm.songs)
    const albumSongs = albumSongIds
        .map(id => mockSongs.find(s => s.music_id === id))
        .filter(s => s !== undefined)

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
                    <h2 className="font-bold text-5xl">{album.album_title}</h2>
                    <h2 className="text-sm text-gray-400">{getArtistName(album.artist)}</h2>
                    <h2 className="text-sm text-gray-400">{albumSongs.length} músicas</h2>
                </div>
            </div>
            <div className="flex flex-col w-full py-6 px-5">
                <div className="flex flex-col">
                    {albumSongs.map((song, index) => (
                        <MusicCard
                            key={song.music_id}
                            musicId={song.music_id}
                            title={song.title}
                            artist={getArtistName(song.artist)}
                            explicit={song.explicit}
                            trackNumber={index + 1}
                            contextParam={`&album=${albumId}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
