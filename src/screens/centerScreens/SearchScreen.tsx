import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { SearchResults, SearchResultItem } from "../../types/SearchResults";
import { emptySearchResults } from "../../types/SearchResults";
import { useFetch } from "../../hooks/useFetch";
import * as searchService from "../../services/SearchService";
import { SelectionButton } from "../../components/SelectionButtons";
import { MusicResultCard } from "../../components/musicCards/MusicResultCard";
import { ArtistResultCard } from "../../components/ArtistsCards/ArtistResultCard";
import { AlbumResultCard } from "../../components/albumCards/AlbumResultCard";
import { PlaylistResultCard } from "../../components/playlistCards/PlaylistResultCard";

 type QuickResult =
    | { type: "music"; data: SearchResultItem }
    | { type: "artist"; data: SearchResultItem }
    | { type: "album"; data: SearchResultItem }
    | { type: "playlist"; data: SearchResultItem };

type FilterType = "all" | "music" | "artist" | "album" | "playlist";

const FILTERS: { type: FilterType; label: string }[] = [
    { type: "all", label: "Tudo" },
    { type: "music", label: "Músicas" },
    { type: "album", label: "Álbuns" },
    { type: "playlist", label: "Playlists" },
    { type: "artist", label: "Artistas" },
];

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

function getResultsByType(results: SearchResults, type: Exclude<FilterType, "all">, limit: number): QuickResult[] {
    const buckets: Record<Exclude<FilterType, "all">, QuickResult[]> = {
        music: results.musics.map((data): QuickResult => ({ type: "music", data })),
        artist: results.artists.map((data): QuickResult => ({ type: "artist", data })),
        album: results.albums.map((data): QuickResult => ({ type: "album", data })),
        playlist: results.playlists.map((data): QuickResult => ({ type: "playlist", data })),
    };

    return buckets[type].slice(0, limit);
}

function renderQuickResult(item: QuickResult) {
    const key = `${item.type}-${item.data.id}`;
    switch (item.type) {
        case "music":
            return (
                <MusicResultCard
                    key={key}
                    name={item.data.name}
                    musicId={item.data.id}
                    artistName={item.data.artistName || ""}
                    explicit={item.data.explicit}
                />
            );
        case "artist":
            return <ArtistResultCard key={key} artistId={item.data.id} name={item.data.name} />;
        case "album":
            return <AlbumResultCard key={key} albumId={item.data.id} name={item.data.name} />;
        case "playlist":
            return <PlaylistResultCard key={key} playlistId={item.data.id} name={item.data.name} />;
    }
}

export default function SearchScreen(){

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") ?? "";
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const { data: results } = useFetch(
        () => (query.trim().length === 0 ? Promise.resolve(emptySearchResults) : searchService.search(query)),
        [query]
    );

    const quickResults = activeFilter === "all"
        ? getQuickResults(results ?? emptySearchResults, 10)
        : getResultsByType(results ?? emptySearchResults, activeFilter, 20);

    return(
        <div className="h-full w-full flex flex-col items-start
                border-2 rounded-lg text-gray-300
                gap-y-4 border-transparent
                bg-[#121212]
                scrollbar-custom overflow-y-auto px-4 py-5">
            <div className="flex items-center gap-x-2">
                {FILTERS.map(({ type, label }) => (
                    <SelectionButton
                        key={type}
                        label={label}
                        selected={activeFilter === type}
                        onClick={() => setActiveFilter(type)}
                    />
                ))}
            </div>
            {quickResults.length === 0 ? (
                <p className="text-gray-400 text-sm p-3">Nenhum resultado encontrado</p>
            ) : (
                <div className="w-full flex flex-col gap-y-1">
                    {quickResults.map(renderQuickResult)}
                </div>
            )}


        </div>
    )
}
