import { useEffect } from "react";
import { ImagePlaceholder } from "../components/ImagePlaceholder";

interface FullMusicScreenProps{
    musicId: string
    imageUrl?: string
}

export function FullMusicScreen({ musicId: _musicId, imageUrl }: FullMusicScreenProps){
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    return(
        <div className="fixed inset-0 z-40 bg-[#000000] flex flex-col items-center justify-center">
            <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                {imageUrl
                    ? <img src={imageUrl} alt="music cover" className="w-full h-full object-cover" />
                    : <ImagePlaceholder type="song" />
                }
            </div>
        </div>
    )
}