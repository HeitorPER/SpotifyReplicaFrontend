import { LuSearch } from "react-icons/lu";

export function HeaderSearchBar(){

    return(
        <div className="flex items-center justify-start gap-x-2
        bg-[#343333] rounded-full md:rounded-2xl
        p-2 md:px-2 md:py-2 md:flex-1
        hover:bg-[#4E4E4E] ease-out duration-300">
            <LuSearch size={20} className="bg-transparent text-gray-400 shrink-0" />
            <input className="hidden md:flex flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
            placeholder="Buscar em sua biblioteca"
            />
        </div>
    )
}