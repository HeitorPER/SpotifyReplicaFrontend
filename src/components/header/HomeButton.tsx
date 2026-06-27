import { GrHomeRounded } from "react-icons/gr";
import {Link} from "react-router-dom"

export function HomeButton(){
    return(
        <Link className="flex items-center justify-center bg-[#343333]
        rounded-full px-2 py-2 cursor-pointer
        hover:bg-[#4E4E4E] ease-out duration-300
        w-10 h-10 shrink-0"
        to="/HomeScreen">
            <GrHomeRounded size={20} className="text-gray-400 flex" />
        </Link>
    )
}