import { useNavigate } from "react-router-dom";
import { ImagePlaceholder } from "../ImagePlaceholder";
import { usePlayer } from "../../context/PlayerContext";
import { getArtistName } from "../../data/mockArtists";
import type { SearchResults, SearchResultItem } from "../../types/SearchResults";

type QuickResult =
    | { type: "music"; data: SearchResultItem }
    | { type: "artist"; data: SearchResultItem }
    | { type: "album"; data: SearchResultItem }
    | { type: "playlist"; data: SearchResultItem };

function getQuickResults(results: SearchResults, limit: number): QuickResult[] {
    const buckets: QuickResult[][] = [
        results.musics.map((data): QuickResult => ({ type: "music", data })),
        results.artists.map((data): QuickResult => ({ type: "artist", data })),
        results.albums.map((data): QuickResult => ({ type: "album", data })),
        results.playlists.map((data): QuickResult => ({ type: "playlist", data })),
    ];

    const quickresults: QuickResult[] =[];
    let index = 0;
    while (quickresults.length < limit && buckets.some(bucket => index < bucket.length)) {
        for (const bucket of buckets) {
            if(quickresults.length >= limit) break;
            if (index < bucket.length) quickresults.push(bucket[index]);
        }
        index++;
    }
    return quickresults;
}

function quickResultLabel(item: QuickResult): {title: string, subtitle: string} {
    switch (item.type) {
        case "music":
            return { title: item.data.name, subtitle: getArtistName(item.data.id) };
        case "album":
            return { title: item.data.name, subtitle: item.data.id};
        case "artist":
            return { title: item.data.name, subtitle: item.data.id};
        case "playlist":
            return { title: item.data.name, subtitle: item.data.id};
    }

}

interface HeaderSearchDropDownnProps{
    results: SearchResults;
    onItemClick: () => void;
}

export function HeaderSearchDropDown({results, onItemClick}: HeaderSearchDropDownnProps) {
    const navigate = useNavigate();
    const { play } = usePlayer();
    const quickResults = getQuickResults(results, 4);

    const handleItemClick = (item: QuickResult) => {
        if(item.type == "music"){
            play(item.data.id);
        }else if(item.type == "playlist"){
            navigate(`/PlaylistScreen/${item.data.id}`);
        }else if(item.type == "album"){
            navigate(`/AlbumScreen/${item.data.id}`);
        }else if(item.type == "artist"){
            navigate(`/ArtistScreen/${item.data.id}`);
        }
        onItemClick();
    }

    return(
        <div className="absolute top-full left-0 mt-2 w-full min-w-64 rounded-lg
        bg-[#282828] shadow-lg overflow-hidden z-50">
            {quickResults.length === 0 ? (
                <p className="text-gray-400 text-sm p-3">Nenhum resultado encontrado</p>
            ) : (
                quickResults.map((item) => {
                    const { title, subtitle } = quickResultLabel(item);
                    const placeholderType = item.type === "music" ? "song" :
                                            item.type === "artist" ? "artist" :
                                            "playlist";
                    return (
                        <button
                            key={`${item.type}-${item.data.id}`}
                            type="button"
                            onClick={() => handleItemClick(item)}
                            className="w-full text-left cursor-pointer flex items-center gap-2
                            p-2 hover:bg-[#3E3E3E]"
                        >
                            <div className="w-10 h-10 shrink-0 rounded overflow-hidden">
                                <ImagePlaceholder type={placeholderType} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-white text-sm truncate">{title}</span>
                                <span className="text-gray-400 text-xs truncate">{subtitle}</span>
                            </div>
                        </button>
                    );
                })
            )}
        </div>
    )

}