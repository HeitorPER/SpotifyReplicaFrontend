import { useState } from "react"
import {FollowUnfollowButton} from "../buttons/FollowUnfollowButton"
import { MusicCreditsPopUp } from "../musicCardOptions/MusicCreditsPopUp"

interface CreditsCardProps {
    artist_name: string
    song_title: string
}

function ArtistCredistCard({ artist_name }: CreditsCardProps){
    return(
        <div className="gap-3 justify-between flex w-full">
                    <div className="flex-col">
                    <h2 className="text-white text-xl">{artist_name}</h2>
                    <h2>Artista Principal</h2>
                    </div>
                    <div className="flex items-center">
                        <FollowUnfollowButton/>
                    </div>
                </div>
    )
}

export function CreditsCard({ artist_name, song_title }: CreditsCardProps) {
    const [isOpenCredits, setIsOpenCredits] = useState(false);

    return (
        <div className="flex flex-col items-center justify-start bg-[#1F1F1F]
        border-t border-transparent rounded-lg w-full text-gray-300
        cursor-pointer gap-2 py-3 px-5">
            <div className="w-full py-2 justify-between flex">
                <h1 className="font-bold text-white text-xl">Créditos</h1>
                <button
                onClick={() => setIsOpenCredits(true)}
                className="text-[#B3B3B3] cursor-pointer
                hover:text-gray-300 hover:underline hover:scale-105
                duration-300
                ">Mostrar tudo</button>
            </div>
            <div className="w-full gap-y-3 items-center">
                <ArtistCredistCard
                    artist_name={artist_name}
                />
                <ArtistCredistCard
                    artist_name={artist_name}
                />
                <ArtistCredistCard
                    artist_name={artist_name}
                />
            </div>
            {isOpenCredits && (
                <MusicCreditsPopUp
                    name={song_title}
                    artistName={artist_name}
                    onClose={() => setIsOpenCredits(false)}
                />
            )}
        </div>
    )
}
