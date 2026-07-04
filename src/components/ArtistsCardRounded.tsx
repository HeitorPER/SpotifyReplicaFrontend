import { Link } from "react-router-dom"
import { ImagePlaceholder } from "./ImagePlaceholder"

interface ArtistsCardProps {
    name: string
    artistId: string
    imageUrl?: string
}

export function ArtistsCardRounded({ name, artistId, imageUrl}: ArtistsCardProps) {
    return (
        <Link className="flex flex-col cursor-pointer
        hover:bg-[#2D2D2D] rounded-lg p-2 w-40 shrink-0"
        to={`/ArtistScreen/${artistId}`}>
            <div className="w-full aspect-square rounded-full overflow-hidden mb-2">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="artist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Artista</span>
            </div>
        </Link>
    )
}