export interface Music {
    id: string;
    title: string;
    artistId: string;
    albumId: string;
    playlistsId: string[];
    duration: number;
    explicit: boolean;
    releaseDate: string;
    timesListen: number;
    createdAt: string;
    updatedAt: string;
}