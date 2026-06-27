import { Link } from "react-router-dom"
import { ImagePlaceholder } from "./ImagePlaceholder"

interface MusicCardProps {
    title: string
    artist: string
    musicId: string
    explicit?: boolean
    imageUrl?: string
    trackNumber?: number
}

export function MusicCard({ title, artist, musicId, explicit = false, imageUrl, trackNumber }: MusicCardProps) {
    return (
        <Link to={`?song=${musicId}`} className="w-full">
            <div className="flex items-center justify-start gap-2
            rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
                {trackNumber !== undefined && (
                    <span className="text-gray-400 text-sm w-5 text-right shrink-0">{trackNumber}</span>
                )}
                <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                    {imageUrl
                        ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                        : <ImagePlaceholder type="song" />
                    }
                </div>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1">
                        <h2 className="text-white text-sm font-medium truncate">{title}</h2>
                        {explicit && (
                            <span className="text-[10px] bg-gray-500 text-gray-200 px-1 rounded shrink-0">E</span>
                        )}
                    </div>
                    <h2 className="text-gray-400 text-xs truncate">{artist}</h2>
                </div>
            </div>
        </Link>
    )
}
