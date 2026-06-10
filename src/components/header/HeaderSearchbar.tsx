import { LuSearch } from "react-icons/lu";

export function HeaderSearchBar(){
    return(
        <div className="w-full flex items-center justify-start gap-x-2
        bg-[#343333] rounded-2xl px-2 py-2
        hover:bg-[#4E4E4E] ease-out duration-300">
            <LuSearch size={20} className="bg-transparent text-gray-400" />
            <input className="flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
            placeholder="Buscar em sua biblioteca"
            />
        </div>
    )
}