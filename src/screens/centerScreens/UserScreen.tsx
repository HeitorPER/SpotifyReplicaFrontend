import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/MusicCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { Shelf } from "../../components/SelfModel";
import * as userService from "../../services/UserService.ts"
import { useFetch } from "../../hooks/useFetch";

interface UserScreenProps{
    imageUrl?: string
    name: string
    playlistNumber:number
}

export default function UserScreen({imageUrl, name}:UserScreenProps) {
    const { data: mostPlayedArtists } = useFetch(userService.getMostPlayedArtists);
    const { data: userPlaylists } = useFetch(userService.getPlaylists);
    const { data: mostPlayedMusics } = useFetch(userService.getMostPlayedMusics);
    const { data: Followers } = useFetch(userService.getFollowers);
    const { data: Following } = useFetch(userService.getFollowing);
    return(
        <div className="h-full w-full flex flex-col items-start
        border-2 rounded-lg text-gray-300
        gap-y-4 border-transparent
        bg-[#121212]
        scrollbar-custom overflow-y-auto">
           <div className="bg-linear-to-t from-gray-600 to-[#121212] flex w-full items-center gap-x-4 py-6 px-5">
                <div className="size-50 shrink-0 rounded-full overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="artist" />
                }
                </div>
                <div className="flex flex-col">
                    <h2 className="text-sm text-gray-400">Perfil</h2>
                    <h2 className="font-bold text-5xl">Heitor Giometti</h2>
                    <div className="flex gap-x items-center">
                        <h2 className="text-sm text-gray-400">{userPlaylists?.length} playlists publicas</h2>
                        <div className="w-1 h-1 rounded-full bg-gray-400 mx-2"/>
                        <h2 className="text-sm text-gray-400">{Followers?.length} seguidores</h2>
                        <div className="w-1 h-1 rounded-full bg-gray-400 mx-2"/>
                        <h2 className="text-sm text-gray-400">{Following?.length} seguindo</h2>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col w-full py-6 px-5">
                <Shelf label="Artistas mais tocados esse mes">
                    <div className="flex gap-x-3">
                        {mostPlayedArtists?.slice(0, 4).map((artist) => (
                            <ArtistsCardRounded key={artist.id} name={artist.name} artistId={artist.id}/>
                        ))}
                    </div>
                </Shelf>
                <div>
                    <h2 className="text-lg text-white font-semibold">Músicas mais tocadas esse mês</h2>
                    <div className="flex flex-col">
                        {mostPlayedMusics?.slice(0, 5).map((song, index) => (
                            <MusicCard
                                key={song.id}
                                musicId={song.id}
                                title={song.title}
                                artist={(song.artistId)}
                                trackNumber={index + 1}
                                explicit={song.explicit}
                            />
                        ))}
                    </div>
                </div>
                <Shelf label="Playlists publicas">
                    <div className="flex gap-x-3">
                        {userPlaylists?.slice(0,4).map((playlist) => (
                            <PlaylistSquareCard key={playlist.id} name={playlist.name} playlistId={playlist.id}/>
                        ))}
                    </div>
                </Shelf>

            </div>
        </div>
    )
}