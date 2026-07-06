import { apiFetch } from "./httpClient";
import type { Album } from "../types/Album";
import type { Music } from "../types/Music";
import type { Artist } from "../types/Artist";


export function getArtistAlbums(artistId: string): Promise<Album[]> {
    return apiFetch<Album[]>(`/artist/${artistId}/albums`);
}

export function getArtistPopularMusics(artistId: string): Promise<Music[]> {
    return apiFetch<Music[]>(`/artist/${artistId}/popularMusics`);
}

export function getArtistById(artistId: string): Promise<Artist> {
    return apiFetch<Artist>(`/artist/${artistId}`);
}

export function getSimilarArtists(artistId: string): Promise<Artist[]> {
    return apiFetch<Artist[]>(`/artist/${artistId}/similar`);
}