import type { Music } from "./Music";

export interface PlaylistMusicEntry {
    position: number;
    music: Music;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    duration: number;
    musicQtd: number;
    musics?: PlaylistMusicEntry[];
    createdAt: string;
    updatedAt: string;
}

export interface UpdatePlaylistDetails{
    name: string;
    description: string;
}
