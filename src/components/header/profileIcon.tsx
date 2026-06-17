import { IoMdPerson } from "react-icons/io";

interface ProfileIconProps {
    imageUrl?: string
}

export function ProfileIcon({ imageUrl }: ProfileIconProps) {
    return (
        <div className="w-10 h-10 rounded-full bg-[#343333]
        hover:bg-[#4E4E4E] ease-out duration-300 cursor-pointer
        fixed top right-4 md:static overflow-hidden
        flex items-center justify-center">
            {imageUrl
                ? <img src={imageUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                : <IoMdPerson className="text-gray-300 opacity-80" style={{ width: '65%', height: '65%' }} />
            }
        </div>
    )
}