import { useParams } from "react-router-dom";
import { MusicCard } from "../../components/musicCards/MusicCard";
import { Shelf } from "../../components/SelfModel";
import { ArtistsCardRounded } from "../../components/ArtistsCards/ArtistsCardRounded";
import { AlbumCard } from "../../components/albumCards/AlbunsSquareCard";
import * as artistService from "../../services/ArtistService";
import { useFetch } from "../../hooks/useFetch";
import { FollowUnfollowButton } from "../../components/buttons/FollowUnfollowButton";
import { ArtistOptionsButton } from "../../components/artistOptions/ArtistOptionsButton";
import { ArtistPlayButton } from "../../components/artistOptions/ArtistPlayButton";


export default function ArtistScreen() {
    const { artistId } = useParams<{ artistId: string }>();
    const { data: artist } = useFetch(() => artistService.getArtistById(artistId as string), [artistId]);
    const {data: artistSongs} = useFetch(() => artistService.getArtistPopularMusics(artistId as string), [artistId]);
    const {data: artistAlbums} = useFetch(() => artistService.getArtistAlbums(artistId as string), [artistId]);
    const {data: similarArtists} = useFetch(() => artistService.getSimilarArtists(artistId as string), [artistId]);

    if (!artist) return null

    const formattedListeners = artist.listeners.toLocaleString("pt-BR")

    return (
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-2 border-transparent
        bg-[#121212]
        scrollbar-custom overflow-y-auto">
            <div className="bg-linear-to-t from-gray-600 to-[#121212] flex w-full items-center gap-x-4 py-6 px-5">
                <div className="flex flex-col gap-y-1">
                    <h2 className="text-sm text-gray-400">Artista</h2>
                    <h2 className="font-bold text-5xl">{artist.name}</h2>
                    <h2 className="text-sm text-gray-400">{formattedListeners} ouvintes mensais</h2>
                </div>
            </div>
            <div className="pl-4 flex w-full justify-start items-center gap-3">
                {artistSongs && artistSongs.length > 0 && (
                    <ArtistPlayButton musicId={artistSongs[0].id} />
                )}
                <FollowUnfollowButton/>
                <ArtistOptionsButton
                artistId={artist.id}/>
            </div>

            <div className="flex flex-col w-full py-6 px-5 gap-y-6">
                <div>
                    <h2 className="text-lg text-white font-semibold mb-2">Músicas populares</h2>
                    <div className="flex flex-col">
                        {artistSongs && artistSongs.length > 0
                            ? artistSongs.slice(0, 5).map((song) => (
                                <MusicCard
                                    key={song.id}
                                    musicId={song.id}
                                    title={song.title}
                                    albumId={song.albumId}
                                    duration={song.duration}
                                    artist={artist.name}
                                    explicit={song.explicit}
                                />
                            ))
                            : <h2>Sem músicas</h2>
                        }
                    </div>
                </div>

                <Shelf label="Álbuns">
                    <div className="flex gap-x-3">
                        {artistAlbums?.map((album) => (
                            <AlbumCard key={album.id} name={album.title} albumId={album.id} />
                        ))}
                    </div>
                </Shelf>

                <Shelf label="Artistas semelhantes">
                    <div className="flex gap-x-3">
                        {similarArtists?.map((a) => (
                            <ArtistsCardRounded key={a.id} name={a.name} artistId={a.id} />
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
