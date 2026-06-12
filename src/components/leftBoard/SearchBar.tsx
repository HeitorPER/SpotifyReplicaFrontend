import { LuSearch } from "react-icons/lu";

export function SearchBar(){
    return(
        <div className="w-full flex items-center justify-start gap-x-2
        bg-[#343333] rounded-[3px] px-2 mt-4">
            <LuSearch size={20} className="bg-transparent" />
            <input className="w-full flex items-center justify-start gap-x-2
            bg-[#343333] rounded-lg border-none outline-none"
            placeholder="Buscar em sua biblioteca"
            />
        </div>
    )
}