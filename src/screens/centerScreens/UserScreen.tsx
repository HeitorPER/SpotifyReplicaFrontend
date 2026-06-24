import { ArtistsCardRounded } from "../../components/ArtistsCardRounded";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { Shelf } from "../../components/SelfModel";
import { mockArtists } from "../../data/mockArtists";
import {mockPlaylists} from "../../data/mockPlaylists"

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
           <div className="bg-linear-to-b from-gray-400 to-[#121212] flex w-full items-center gap-x-4 py-6 px-5">
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
            <div className="flex w-full">
                <Shelf
                label="Artistas mais tocados esse mes"
                >
                    <div className="flex gap-x-3">
                        {mockArtists.slice(0, 4).map((artist) => (
                            <ArtistsCardRounded name={artist.artist_name}/>
                        ))}
                    </div>
                </Shelf>

            </div>
        </div>
    )
}