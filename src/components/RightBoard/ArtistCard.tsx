import { ImagePlaceholder } from "../ImagePlaceholder"
import {FollowUnfollowButton} from "../buttons/FollowUnfollowButton"

interface ArtistCardProps {
    imageUrl?: string
    artist_name: string
    num_listeners: number
    about: string
}

export function ArtistCard({ imageUrl, artist_name, num_listeners, about }: ArtistCardProps) {
    return (
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        border-t border-transparent rounded-lg w-full text-gray-300
        cursor-pointer pb-2">
            <div className="rounded-t-lg aspect-rectangle w-full overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt={artist_name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="artist" />
                }
            </div>
            <div className="w-full px-5">
                <h1 className="text-xl font-bold mt-2 text-white">{artist_name}</h1>
                <div className="flex justify-between items-center gap-2 mt-1">
                    <span className="text-gray-300 text-sm">
                        {num_listeners.toLocaleString('pt-BR')} ouvintes Mensais
                    </span>
                    <FollowUnfollowButton/>
                </div>
                <p className="text-gray-300 text-sm mt-1">{about}</p>
            </div>
        </div>
    )
}
