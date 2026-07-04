import {apiFetch} from "./httpClient";
import type { Playlist } from "../types/Playlist";

export function getPlaylistById(playlistId: string): Promise<Playlist> {
    return apiFetch<Playlist>(`/playlist/${playlistId}`);
}