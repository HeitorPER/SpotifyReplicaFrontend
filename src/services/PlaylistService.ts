import {apiFetch} from "./httpClient";
import type { Playlist } from "../types/Playlist";

export function getPlaylistById(playlistId: string): Promise<Playlist> {
    return apiFetch<Playlist>(`/playlist/${playlistId}`);
}

export function createPlaylist(playlist: Omit<Playlist, "id">): Promise<Playlist> {
    return apiFetch<Playlist>("/playlist/", { method: "POST", body: playlist });
}

export function addMusicToPlaylist(playlistId: string, musicId:string): Promise<Playlist>{
    return apiFetch<Playlist>(`/playlist/${playlistId}/${musicId}`, {method: "PATCH"})
}

export function deleteMusicById(playlistId: string, musicId:string): Promise<Playlist>{
    return apiFetch<Playlist>(`/playlist/${playlistId}/${musicId}`, {method: "DELETE"})
}