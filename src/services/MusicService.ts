import { apiFetch } from "./httpClient";
import type { Music } from "../types/Music";

export function getMusicById(musicId: string): Promise<Music> {
    return apiFetch<Music>(`/music/${musicId}`);
}
