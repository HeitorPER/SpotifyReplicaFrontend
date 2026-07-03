import { Link } from "react-router-dom"
import { ImagePlaceholder } from "../ImagePlaceholder"

interface AlbumCardProps {
    name: string
    albumId: string
    imageUrl?: string
}

export function AlbumCard({ name, albumId, imageUrl }: AlbumCardProps) {
    return (
        <Link to={`/AlbumScreen/${albumId}`} className="flex items-center justify-start gap-2
        rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
            <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="playlist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Álbum</span>
            </div>
        </Link>
    )
}