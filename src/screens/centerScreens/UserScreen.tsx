import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { MusicCard } from "../../components/MusicCard";
import { PlaylistSquareCard } from "../../components/playlistCards/playlistSquareCard";
import { Shelf } from "../../components/SelfModel";
import { mockArtists, getArtistName } from "../../data/mockArtists";
import {mockPlaylists} from "../../data/mockPlaylists"
import { mockSongs } from "../../data/mockSongs"

interface UserScreenProps{
    imageUrl?: string
    name: string
    playlistNumber:number
}

export default function UserScreen({imageUrl, name}:UserScreenProps){
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
                    <h2 className="text-sm text-gray-400">{mockPlaylists.length} playlists publicas</h2>
                </div>
            </div>
            <div className="flex flex-col w-full py-6 px-5">
                <Shelf label="Artistas mais tocados esse mes">
                    <div className="flex gap-x-3">
                        {mockArtists.slice(0, 4).map((artist) => (
                            <ArtistsCardRounded key={artist.artist_id} name={artist.artist_name} artistId={artist.artist_id}/>
                        ))}
                    </div>
                </Shelf>
                <div>
                    <h2 className="text-lg text-white font-semibold">Músicas mais tocadas esse mês</h2>
                    <div className="flex flex-col">
                        {mockSongs.slice(0, 5).map((song) => (
                            <MusicCard
                                key={song.music_id}
                                title={song.title}
                                artist={getArtistName(song.artist)}
                                explicit={song.explicit}
                            />
                        ))}
                    </div>
                </div>
                <Shelf label="Playlists publicas">
                    <div className="flex gap-x-3">
                        {mockPlaylists.slice(0,4).map((playlist) => (
                            <PlaylistSquareCard name={playlist.name}/>
                        ))}
                    </div>
                </Shelf>

            </div>
        </div>
    )
}