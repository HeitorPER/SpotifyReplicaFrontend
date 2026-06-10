import { HeaderSearchBar } from "./header/HeaderSearchbar";
import { FaSpotify } from "react-icons/fa";
import { ProfileIcon } from "./header/profileIcon";
import { HomeButton } from "./header/HomeButton";
import { NotificationButton } from "./header/NotificationButton";

export function Header(){

    return(
        <div className="grid grid-cols-3 items-center px-4 py-1.5">
                <FaSpotify size={30} className="text-white w-10 h-10" />
                <div className="flex items-center justify-center gap-x-1">
                    <HomeButton />
                    <HeaderSearchBar />
                </div>
                <div className="flex justify-end items-center gap-x-3">
                    <NotificationButton />
                    <ProfileIcon />
                </div>
        </div>
    )
}