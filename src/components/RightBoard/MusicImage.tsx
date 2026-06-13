 interface MusicProp{
    imageUrl: string;
    songName: string;
    artist: string;
}

export function MusicImage({ imageUrl, songName, artist }: MusicProp){
    return(
        <div className="flex flex-col rounded-lg w-full">
            <img src={imageUrl} alt="Album Art" className="rounded-sm aspect-square w-full object-cover" />
            <div className="mt-2">
                <h2 className="text-white text-3xl ml-1 font-bold">{songName}</h2>
                <h1 className="text-gray-300 text-sm ml-1">{artist}</h1>
            </div>
        </div>
    )
}