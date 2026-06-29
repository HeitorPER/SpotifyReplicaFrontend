import { useState, useEffect, useRef } from "react";
import { AiFillStepForward,
        AiFillStepBackward,
        AiFillPlayCircle,
        AiFillPauseCircle  } from "react-icons/ai";

interface PlayTimerProps {
    musicId: string;
    duration: number;
    onNext?: () => void;
    onPrev?: () => void;
}

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayTimer({ musicId, duration, onNext, onPrev }: PlayTimerProps){
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const onNextRef = useRef(onNext);
    useEffect(() => { onNextRef.current = onNext; }, [onNext]);
    const shouldAutoPlay = useRef(false);

    useEffect(() => {
        if (!playing) return;

        const interval = setInterval(() => {
            setCurrentTime(prev => {
                if (prev >= duration) {
                    clearInterval(interval);
                    if (onNextRef.current) {
                        shouldAutoPlay.current = true;
                        setPlaying(false);
                        onNextRef.current();
                    } else {
                        setPlaying(false);
                    }
                    return duration;
                }
                return prev + 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [playing, musicId, duration]);

    useEffect(() => {
        setCurrentTime(0);
        if (shouldAutoPlay.current) {
            shouldAutoPlay.current = false;
            setPlaying(true);
        } else {
            setPlaying(false);
        }
    }, [musicId]);

    function handleNext() {
        if (!onNext) return;
        if (playing) shouldAutoPlay.current = true;
        setPlaying(false);
        onNext();
    }

    function handlePrev() {
        if (!onPrev) return;
        if (playing) shouldAutoPlay.current = true;
        setPlaying(false);
        onPrev();
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex text-3xl items-center gap-2">
                <AiFillStepBackward
                className="text-gray-500 hover:text-white cursor-pointer"
                onClick={handlePrev}/>
                {playing
                    ? <AiFillPauseCircle
                        className="text-white cursor-pointer"
                        onClick={() => setPlaying(false)}/>
                    : <AiFillPlayCircle
                        className="text-white cursor-pointer"
                        onClick={() => setPlaying(true)}/>
                }
                <AiFillStepForward
                className="text-gray-500 hover:text-white cursor-pointer"
                onClick={handleNext}/>
            </div>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400 w-8 text-right">
                    {formatTime(currentTime)}
                </span>
                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime}
                    onChange={e => setCurrentTime(Number(e.target.value))}
                    className="progress-bar w-48 cursor-pointer"
                    style={{ "--progress": `${(currentTime / duration) * 100}%` } as React.CSSProperties}
                />
                <span className="text-xs text-gray-400 w-8">
                    {formatTime(duration)}
                </span>
            </div>
        </div>
    )
}