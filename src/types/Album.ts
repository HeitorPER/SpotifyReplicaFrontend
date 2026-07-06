import type { Music } from "./Music";

export interface Album {
    id: string;
    title: string;
    year: string;
    artistId: string;
    artistName: string;
    musics: Music[];
    createdAt: string;
    updatedAt: string;
}