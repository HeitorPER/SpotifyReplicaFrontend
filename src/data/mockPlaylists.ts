export interface Playlist {
    id: number;
    name: string;
    author: string;
    type: string;
    imageUrl: string;
}

export const mockPlaylists: Playlist[] = [
    {
        id: 1,
        name: "Curtindo o Verão",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/verao/64/64",
    },
    {
        id: 2,
        name: "Foco Total",
        author: "Playlist",
        type: "Playlist",           
        imageUrl: "https://picsum.photos/seed/foco/64/64",
    },
    {
        id: 3,
        name: "Saudade dos Anos 2000",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/anos2000/64/64",
    },
    {
        id: 4,
        name: "Late Night Vibes",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/latenight/64/64",
    },
    {
        id: 5,
        name: "Workout Mix",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/workout/64/64",
    },
    {
        id: 6,
        name: "Músicas para Chover",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/chuva/64/64",
    },
    {
        id: 7,
        name: "Road Trip",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/roadtrip/64/64",
    },
    {
        id: 8,
        name: "Boa Semana",
        author: "Playlist",
        type: "Playlist",
        imageUrl: "https://picsum.photos/seed/semana/64/64",
    },
];
