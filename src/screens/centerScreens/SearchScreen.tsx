import { useNavigate, useSearchParams } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import type { SearchResults, SearchResultItem } from "../../types/SearchResults";
import { emptySearchResults } from "../../types/SearchResults";
import { ImagePlaceholder } from "../../components/ImagePlaceholder";
import { useFetch } from "../../hooks/useFetch";
import * as searchService from "../../services/SearchService";
import { SelectionButton } from "../../components/SelectionButtons";

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
            return { title: item.data.name, subtitle: "Música • " + item.data.artistName};
        case "album":
            return { title: item.data.name, subtitle: "Álbum • " + item.data.artistName};
        case "artist":
            return { title: item.data.name, subtitle: "Artist"};
        case "playlist":
            return { title: item.data.name, subtitle: "Playlist"};
    }

}

export default function SearchScreen(){

    const navigate = useNavigate();
    const { play } = usePlayer();
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";

    const { data: results } = useFetch(
        () => (query.trim().length === 0 ? Promise.resolve(emptySearchResults) : searchService.search(query)),
        [query]
    );

    const quickResults = getQuickResults(results ?? emptySearchResults, 10);

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
    };

   
    
    return(
        <div className="h-full w-full flex flex-col items-start
                border-2 rounded-lg text-gray-300
                gap-y-4 border-transparent
                bg-[#121212]
                scrollbar-custom overflow-y-auto px-4 py-5">
            <div className="flex items-center gap-x-2">
                <SelectionButton label="Tudo"/>
                <SelectionButton label="Músicas"/>
                <SelectionButton label="Álbuns"/>
                <SelectionButton label="Playlists"/>
            </div>
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
                            p-2 hover:bg-[#3E3E3E] rounded-sm"
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