import { IoMdClose } from "react-icons/io";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { FollowUnfollowButton } from "../buttons/FollowUnfollowButton";

interface ArtistPopUpProps {
    imageUrl?: string;
    artistName: string;
    numListeners: number;
    about: string;
    onClose: () => void;
}

export function ArtistPopUp({ imageUrl, artistName, numListeners, about, onClose }: ArtistPopUpProps) {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm">
            <div
                onClick={(e) => e.stopPropagation()}
                className="scrollable w-120 max-h-[80vh] overflow-y-auto
                bg-black rounded-lg shadow-lg flex flex-col">

                <div className="relative w-full aspect-video shrink-0">
                    {imageUrl
                        ? <img src={imageUrl} alt={artistName} className="w-full h-full object-cover" />
                        : <ImagePlaceholder type="artist" />
                    }
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5
                        text-white hover:bg-black/80 cursor-pointer">
                        <IoMdClose size={20} />
                    </button>
                </div>

                <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-center justify-between gap-2">
                        <h1 className="text-white text-3xl font-bold">{artistName}</h1>
                        <FollowUnfollowButton />
                    </div>

                    <div>
                        <span className="text-white text-2xl font-bold">
                            {numListeners.toLocaleString("pt-BR")}
                        </span>
                        <span className="text-[#B3B3B3] text-sm block">Ouvintes mensais</span>
                    </div>

                    <p className="text-gray-300 text-sm">{about}</p>
                </div>
            </div>
        </div>
    )
}