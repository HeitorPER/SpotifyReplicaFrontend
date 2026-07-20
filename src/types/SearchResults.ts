export interface SearchResultItem {
    id: string;
    name: string;
    artistName?: string;
    explicit?: boolean;
    
}

export interface SearchResults {
    musics: SearchResultItem[];
    albums: SearchResultItem[];
    artists: SearchResultItem[];
    playlists: SearchResultItem[];
}

export const emptySearchResults: SearchResults = {
    musics: [],
    albums: [],
    artists: [],
    playlists: [],
};
