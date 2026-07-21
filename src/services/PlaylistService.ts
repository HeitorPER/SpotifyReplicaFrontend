import {apiFetch} from "./httpClient";
import type { Playlist, UpdatePlaylistDetails } from "../types/Playlist";

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

export function editPlaylistAttributes(playlistId:string, name: string, description:string): Promise<UpdatePlaylistDetails>{
    return apiFetch<UpdatePlaylistDetails>(`/playlist/${playlistId}/attributes`,
        {method: "PUT", body: { name, description }}
    )
}

export function deletePlaylistById(playlistId:string){
    return apiFetch(`/playlist/${playlistId}`,{method: "DELETE"})
}