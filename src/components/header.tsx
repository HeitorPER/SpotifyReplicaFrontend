import { HeaderSearchBar } from "./header/HeaderSearchbar";
import { FaSpotify } from "react-icons/fa";
import { ProfileIcon } from "./header/profileIcon";
import { HomeButton } from "./header/HomeButton";
import { NotificationButton } from "./header/NotificationButton";

export function Header(){

    return(
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-1.5 w-screen">
            {/* col 1 — logo (desktop) | home + bolinha de busca (mobile) */}
            <div className="flex items-center gap-x-2">
                <FaSpotify size={30} className="hidden md:block text-white w-10 h-10" />
                <div className="md:hidden flex items-center gap-x-2">
                    <HomeButton />
                    <HeaderSearchBar />
                </div>
            </div>

            {/* col 2 — home + barra centralizada (só desktop) */}
            <div className="hidden md:flex items-center gap-x-2 w-80">
                <HomeButton />
                <HeaderSearchBar />
            </div>

            {/* col 3 — notificações + perfil */}
            <div className="flex items-center justify-end gap-x-3">
                <NotificationButton />
                <ProfileIcon />
            </div>
        </div>
    )
}