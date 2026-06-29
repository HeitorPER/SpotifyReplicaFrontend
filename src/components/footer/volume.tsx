import { useState } from "react";
import { IoVolumeLowOutline } from "react-icons/io5";

export function Volume(){
    const [volume, setVolume] = useState(100);

    return(
        <div className="flex justify-center items-center">
            <IoVolumeLowOutline className="text-[#B3B3B3] text-2xl"/>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="progress-bar w-24 cursor-pointer"
                style={{ "--progress": `${volume}%` } as React.CSSProperties}
            />
        </div>
    )
}