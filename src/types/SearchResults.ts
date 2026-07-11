import type { Music } from "./Music";
import type { Album } from "./Album";
import type { Artist } from "./Artist";
import type { Playlist } from "./Playlist";

export interface SearchResults {
	musics: Music[];
	albums: Album[];
	artists: Artist[];
	playlists: Playlist[];
}

export const emptySearchResults: SearchResults = {
    musics: [],
    albums: [],
    artists: [],
    playlists: [],
};