export function PlaylistCard(){
    return(
        <div className="flex items-center justify-start gap-2
        roudend-lg hover:bg-gray-700 cursor-pointer roudend-ls w-full"> 
            <div className="w-16 h-16 bg-gray-500 shrink-0">
                <img
                    src="/path/to/playlist-image.jpg"
                    alt="Playlist Image"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
            </div>
            <h2>Playlist Card</h2>
        </div>
    )
}