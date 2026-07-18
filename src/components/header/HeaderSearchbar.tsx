import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HeaderSearchDropDown } from "./SearchBarDropDown";
import * as searchService from "../../services/SearchService"
import { useFetch } from "../../hooks/useFetch";
import { emptySearchResults } from "../../types/SearchResults";

export function HeaderSearchBar(){
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const { data: results } = useFetch(() => searchService.search(query), [query]);

    const goToSearchScreen = () => {
        const trimmed = query.trim();
        if (trimmed.length === 0) return;
        navigate(`/SearchScreen?q=${encodeURIComponent(trimmed)}`);
        setIsFocused(false);
        containerRef.current?.querySelector("input")?.blur();
    };
    

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            goToSearchScreen();
        } else if (event.key === "Escape") {
            setIsFocused(false);
        }
    };

    return(
        <div ref={containerRef} className="relative flex items-center justify-start gap-x-2
        bg-[#343333] rounded-full md:rounded-2xl
        p-2 md:px-2 md:py-2 md:flex-1
        hover:bg-[#4E4E4E] ease-out duration-300">
            <LuSearch size={20} className="bg-transparent text-gray-400 shrink-0" />
            <input className="hidden md:flex flex-1 bg-transparent outline-none text-white placeholder:text-gray-400"
            placeholder="Buscar em sua biblioteca"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            />
            {isFocused && (
                <HeaderSearchDropDown
                    results={results ?? emptySearchResults}
                    onItemClick={() => setIsFocused(false)}
                />
            )}
        </div>
    )
}