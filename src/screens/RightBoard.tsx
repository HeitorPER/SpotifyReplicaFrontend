import { MusicImage } from "../components/RightBoard/MusicImage";
import { mockSongs } from "../data/mockSongs";

export function RightBoard(){
    return(
        <div className="flex flex-col items-center justify-start px-4
        bg-[#121212] border border-transparent rounded-lg w-1/4 text-gray-300"> 
            <div className="w-full py-4 justify-between flex items-center">
                {/* Mudar para origem da musica que esta tocando(playlist, artista, album) */}
                <h1 className="text-xl font-bold">{mockSongs[0].artist}</h1>
                <button 
                className="text-white text-sm border border-transparent
                rounded-lg px-3 py-1 hover:bg-gray-700 transition-colors cursor-pointer">
                    ...
                </button>
            </div>
            <div className="w-full">
                <MusicImage 
                    imageUrl={mockSongs[0].imageUrl}
                    songName={mockSongs[0].songName}
                    artist={mockSongs[0].artist}
                />
            </div>
            <div className="w-full flex-1">
                <h2>Conteúdo</h2>
                <div>

                </div>
            </div>
        </div>
    )
}