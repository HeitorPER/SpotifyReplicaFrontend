import { ImagePlaceholder } from "../ImagePlaceholder"

interface PlaylistCardProps {
    name: string
    imageUrl?: string
}

export function PlaylistSquareCard({ name, imageUrl }: PlaylistCardProps) {
    return (
        <div className="flex flex-col cursor-pointer hover:bg-[#2D2D2D] rounded-lg p-2 w-40">
            <div className="w-full aspect-square rounded overflow-hidden mb-2">
                {imageUrl
                    ? <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="playlist" />
                }
            </div>
            <div className="flex flex-col min-w-0">
                <span className="text-white text-sm font-medium line-clamp-2">{name}</span>
                <span className="text-gray-400 text-xs">Playlist</span>
            </div>
        </div>
    )
}