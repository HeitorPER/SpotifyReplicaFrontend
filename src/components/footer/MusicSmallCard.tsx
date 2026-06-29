import { Link } from "react-router-dom";
import { ImagePlaceholder } from "../ImagePlaceholder";

interface MusicCardProps {
    title: string
    artist: string
    musicName: string
    albumId: string
    artistId: string
    explicit?: boolean
    imageUrl?: string
    trackNumber?: number
}

export function MusicSmallCard({imageUrl, title, artist, albumId, artistId}:MusicCardProps){
    return(
        <div className="flex gap-2">
            <div className="w-12 h-12 shrink-0 rounded overflow-hidden">
                    {imageUrl
                        ? <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                        : <ImagePlaceholder type="song" />
                    }
            </div>
            <div className="flex-col flex gap-0.5">
                <Link 
                    to={`/AlbumScreen/${albumId}`} 
                    className="text-white font-semibold hover:underline">
                        {title}
                </Link>

                <Link 
                    to={`/ArtistScreen/${artistId}`} 
                    className="text-gray-300 hover:underline">
                        {artist}
                </Link>
            </div>
        </div>
    )
}