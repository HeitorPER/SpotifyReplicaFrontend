import { IoIosMusicalNotes } from "react-icons/io";
import { IoMdPerson } from "react-icons/io";

type PlaceholderType = 'song' | 'artist' | 'playlist'

const config: Record<PlaceholderType, { bg: string; icon: React.ReactNode }> = {
    song: {
        bg: '#1a3a2a',
        icon: <IoIosMusicalNotes className="w-1/2 h-1/2 text-green-400 opacity-70" style={{ width: '50%', height: '50%' }} />,
    },
    artist: {
        bg: '#2a1a3a',
        icon: <IoMdPerson className="text-purple-400 opacity-70" style={{ width: '50%', height: '50%' }} />,
    },
    playlist: {
        bg: '#3a2a1a',
        icon: <IoIosMusicalNotes className="text-orange-400 opacity-70" style={{ width: '50%', height: '50%' }} />,
    },
}

interface ImagePlaceholderProps {
    type: PlaceholderType
    className?: string
}

export function ImagePlaceholder({ type, className = '' }: ImagePlaceholderProps) {
    const { bg, icon } = config[type]
    return (
        <div
            className={`flex items-center justify-center w-full h-full ${className}`}
            style={{ backgroundColor: bg }}
        >
            {icon}
        </div>
    )
}
