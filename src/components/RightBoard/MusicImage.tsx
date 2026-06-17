import { ImagePlaceholder } from "../ImagePlaceholder"

interface MusicProp {
    imageUrl?: string
    title: string
    artist: string
}

export function MusicImage({ imageUrl, title, artist }: MusicProp) {
    return (
        <div className="flex flex-col rounded-lg w-full">
            <div className="rounded-sm aspect-square w-full overflow-hidden">
                {imageUrl
                    ? <img src={imageUrl} alt="Album Art" className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="song" />
                }
            </div>
            <div className="mt-2">
                <h2 className="text-white text-3xl ml-1 font-bold">{title}</h2>
                <h1 className="text-gray-300 text-sm ml-1">{artist}</h1>
            </div>
        </div>
    )
}
