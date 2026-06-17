import { MusicCard } from "../MusicCard";

interface NextMusicCardProps {
    title: string
    artist: string
    explicit?: boolean
    imageUrl?: string
}

export function NextMusicCard({ title, artist, explicit, imageUrl }: NextMusicCardProps) {
    return (
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        border-t border-transparent rounded-lg w-full text-gray-300
        cursor-pointer gap-2 py-3 px-5">
            <div className="justify-start flex items-start w-full">
                <h2 className="font-bold text-white">A seguir</h2>
            </div>
            <div className="w-full">
                <MusicCard
                    title={title}
                    artist={artist}
                    explicit={explicit}
                    imageUrl={imageUrl}
                />
            </div>
        </div>
    )
}