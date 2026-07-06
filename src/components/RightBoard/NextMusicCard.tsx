import { MusicCard } from "../MusicCard";

interface NextMusicCardProps {
    musicId: string
    title: string
    artist: string
    explicit?: boolean
    imageUrl?: string
    playlistId?: string
    albumId?: string
}

export function NextMusicCard({ musicId, title, artist, explicit, imageUrl, playlistId, albumId }: NextMusicCardProps) {
    return (
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        border-t border-transparent rounded-lg w-full text-gray-300
        cursor-pointer gap-2 py-3 px-5">
            <div className="justify-start flex items-start w-full">
                <h2 className="font-bold text-white">A seguir</h2>
            </div>
            <div className="w-full">
                <MusicCard
                    musicId={musicId}
                    title={title}
                    artist={artist}
                    explicit={explicit}
                    imageUrl={imageUrl}
                    playlistId={playlistId}
                    albumId={albumId}
                />
            </div>
        </div>
    )
}