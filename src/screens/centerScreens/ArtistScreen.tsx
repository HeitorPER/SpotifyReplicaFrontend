import { useParams } from "react-router-dom";
import { MusicCard } from "../../components/MusicCard";
import { Shelf } from "../../components/SelfModel";
import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { AlbumCard } from "../../components/AlbunsCard";
import { mockArtists } from "../../data/mockArtists";
import { mockSongs } from "../../data/mockSongs";
import { mockAlbums } from "../../data/mockAlbums";

interface ArtistScreenProps {
    imageUrl?: string
}

export default function ArtistScreen({  }: ArtistScreenProps) {
    const { artistId } = useParams<{ artistId: string }>()
    const artist = mockArtists.find(a => a.artist_id === artistId)
    const artistSongs = mockSongs.filter(s => s.artist === artistId)
    const artistAlbums = mockAlbums.filter(a => a.artist === artistId)
    const similarArtists = mockArtists.filter(a => a.artist_id !== artistId).slice(0, 4)

    if (!artist) return null

    const formattedListeners = artist.num_listeners.toLocaleString("pt-BR")

    return (
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-4 border-transparent
        bg-[#121212]
        scrollbar-custom overflow-y-auto">
            <div className="bg-linear-to-t from-gray-600 to-[#121212] flex w-full items-center gap-x-4 py-6 px-5">
                <div className="flex flex-col gap-y-1">
                    <h2 className="text-sm text-gray-400">Artista</h2>
                    <h2 className="font-bold text-5xl">{artist.artist_name}</h2>
                    <h2 className="text-sm text-gray-400">{formattedListeners} ouvintes mensais</h2>
                </div>
            </div>

            <div className="flex flex-col w-full py-6 px-5 gap-y-6">
                <div>
                    <h2 className="text-lg text-white font-semibold mb-2">Músicas populares</h2>
                    <div className="flex flex-col">
                        {artistSongs.length > 0
                            ? artistSongs.slice(0, 5).map((song) => (
                                <MusicCard
                                    key={song.music_id}
                                    title={song.title}
                                    artist={artist.artist_name}
                                    explicit={song.explicit}
                                />
                            ))
                            : mockSongs.slice(0, 5).map((song) => (
                                <MusicCard
                                    key={song.music_id}
                                    title={song.title}
                                    artist={artist.artist_name}
                                    explicit={song.explicit}
                                />
                            ))
                        }
                    </div>
                </div>

                <Shelf label="Álbuns">
                    <div className="flex gap-x-3">
                        {artistAlbums.map((album) => (
                            <AlbumCard key={album.album_id} name={album.album_title} />
                        ))}
                    </div>
                </Shelf>

                <Shelf label="Artistas semelhantes">
                    <div className="flex gap-x-3">
                        {similarArtists.map((a) => (
                            <ArtistsCardRounded key={a.artist_id} name={a.artist_name} artistId={a.artist_id} />
                        ))}
                    </div>
                </Shelf>

                <div>
                    <h2 className="text-lg text-white font-semibold mb-2">Sobre</h2>
                    <p className="text-gray-400 text-sm max-w-lg">{artist.about}</p>
                </div>
            </div>
        </div>
    )
}
