import type { Music } from "./Music";

export interface Playlist {
    id: string;
    name: string;
    description: string;
    duration: number;
    musicQtd: number;
    musics?: Music[];
    createdAt: string;
    updatedAt: string;
}

export interface UpdatePlaylistDetails{
    name: string;
    description: string;
}
