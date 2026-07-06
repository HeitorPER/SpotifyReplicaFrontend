import { apiFetch } from "./httpClient";
import type { Album } from "../types/Album";
import type { Artist } from "../types/Artist";
import type { Music } from "../types/Music";
import type { Playlist } from "../types/Playlist";
import type { User } from "../types/User";

export function getFollowers(): Promise<User[]> {
    return apiFetch<User[]>("/user/followers");
}

export function getFollowing(): Promise<User[]> {
    return apiFetch<User[]>("/user/following");
}

export async function getMostPlayedArtists(): Promise<Artist[]> {
    return apiFetch<Artist[]>("/user/mostPlayedArtists");
}

export function getMostPlayedMusics(): Promise<Music[]> {
    return apiFetch<Music[]>("/user/mostPlayedMusics");
}

export function getPlaylists(): Promise<Playlist[]> {
    return apiFetch<Playlist[]>("/user/playlists");
}

export function getRecentAlbums(): Promise<Album[]> {
    return apiFetch<Album[]>("/user/recentAlbums");
}

export function getRecentArtists(): Promise<Artist[]> {
    return apiFetch<Artist[]>("/user/recentArtists");
}

export function getRecentMusics(): Promise<Music[]> {
    return apiFetch<Music[]>("/user/recentMusics");
}