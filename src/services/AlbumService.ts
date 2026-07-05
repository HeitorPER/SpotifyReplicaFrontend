import {apiFetch} from "./httpClient";
import type { Album } from "../types/Album";
import type { Music } from "../types/Music";

export function getAlbumById(albumId: string): Promise<Album> {
    return apiFetch<Album>(`/album/${albumId}`);
}

export function getAlbumMusics(albumId: string): Promise<Music[]> {
    return apiFetch<Music[]>(`/album/${albumId}/musics`);
}