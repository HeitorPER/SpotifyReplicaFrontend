import { ImagePlaceholder } from "./ImagePlaceholder"

interface PlaylistCardProps {
    name: string
    imageUrl?: string
    compact?: boolean
}

export function PlaylistCard({ name, imageUrl, compact }: PlaylistCardProps) {
    return (
        <div className={`flex items-center justify-start gap-2
        rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full ${compact ? "px-2 py-1" : "p-2"}`}>
            <div className={`${compact ? "w-9 h-9" : "w-12 h-12"} shrink-0 rounded overflow-hidden`}>
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
