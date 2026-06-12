interface PlaylistCardProps {
    name: string;
    author: string;
    type: string;
    imageUrl: string;
}

export function PlaylistCard({ name, author, type, imageUrl }: PlaylistCardProps){
    return(
        <div className="flex items-center justify-start gap-2
        rounded-lg hover:bg-[#2D2D2D] cursor-pointer w-full p-2">
            <div className="w-12 h-12 shrink-0 rounded">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-white text-sm font-medium">{name}</span>
                <div className="flex items-center gap-1">
                <span className="text-gray-400 text-xs">{author}</span>
                <span className="text-gray-400 text-xs">•</span>
                <span className="text-gray-400 text-xs">{type}</span>
                </div>
            </div>
        </div>
    )
}