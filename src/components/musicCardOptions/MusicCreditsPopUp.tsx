import { IoMdClose } from "react-icons/io";
import { FollowUnfollowButton } from "../buttons/FollowUnfollowButton";

interface ContributorRowProps {
    name: string;
    roles: string;
}

interface MusicCreditsPopUpProps {
    name: string;
    artistName: string;
    onClose: () => void;
}

function ContributorRow({ name, roles }: ContributorRowProps) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-white text-base">{name}</span>
            <span className="text-[#B3B3B3] text-sm">{roles}</span>
        </div>
    )
}

export function MusicCreditsPopUp({ name, artistName, onClose }: MusicCreditsPopUpProps) {
    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/40 backdrop-blur-sm">
            <div
                onClick={(e) => e.stopPropagation()}
                className="scrollable w-120 max-h-[80vh] overflow-y-auto
                bg-black rounded-lg shadow-lg p-6 flex flex-col gap-6">

                <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                        <h1 className="text-white text-3xl font-bold">Créditos</h1>
                        <button
                            onClick={onClose}
                            className="text-[#B3B3B3] hover:text-white cursor-pointer">
                            <IoMdClose size={22} />
                        </button>
                    </div>
                    <span className="text-white text-lg font-medium">{name}</span>
                </div>

                <div className="border-t border-[#2D2D2D]" />

                <div className="flex flex-col gap-3">
                    <h2 className="text-white text-xl font-bold">Artista</h2>
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                            <span className="text-white text-base">{artistName}</span>
                            <span className="text-[#B3B3B3] text-sm">Artista Principal</span>
                        </div>
                        <FollowUnfollowButton />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h2 className="text-white text-xl font-bold">Composição e letra</h2>
                    <div className="flex flex-col gap-4">
                        <ContributorRow name={artistName} roles="Arranjos • Autores • Letrista" />
                        <ContributorRow name={artistName} roles="Arranjos • Autores • Letrista" />
                        <ContributorRow name={artistName} roles="Autores" />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-white text-xl font-bold">Fontes</h2>
                    <span className="text-[#B3B3B3] text-sm">{artistName}</span>
                </div>

            </div>
        </div>
    )
}
