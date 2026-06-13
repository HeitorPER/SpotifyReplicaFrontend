export interface Song {
    id: number;
    songName: string;
    artist: string;
    duration: string;
    imageUrl: string;
}

export const mockSongs: Song[] = [
    {
        id: 1,
        songName: "Blinding Lights",
        artist: "The Weeknd",
        duration: "3:20",
        imageUrl: "https://picsum.photos/seed/blindinglights/128/128",
    },
    {
        id: 2,
        songName: "As It Was",
        artist: "Harry Styles",
        duration: "2:37",
        imageUrl: "https://picsum.photos/seed/asitwas/128/128",
    },
    {
        id: 3,
        songName: "Flowers",
        artist: "Miley Cyrus",
        duration: "3:20",
        imageUrl: "https://picsum.photos/seed/flowers/128/128",
    },
    {
        id: 4,
        songName: "Levitating",
        artist: "Dua Lipa",
        duration: "3:23",
        imageUrl: "https://picsum.photos/seed/levitating/128/128",
    },
    {
        id: 5,
        songName: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        duration: "2:21",
        imageUrl: "https://picsum.photos/seed/stay/128/128",
    },
    {
        id: 6,
        songName: "Heat Waves",
        artist: "Glass Animals",
        duration: "3:59",
        imageUrl: "https://picsum.photos/seed/heatwaves/128/128",
    },
    {
        id: 7,
        songName: "Bad Guy",
        artist: "Billie Eilish",
        duration: "3:14",
        imageUrl: "https://picsum.photos/seed/badguy/128/128",
    },
    {
        id: 8,
        songName: "Dynamite",
        artist: "BTS",
        duration: "3:19",
        imageUrl: "https://picsum.photos/seed/dynamite/128/128",
    },
    {
        id: 9,
        songName: "Cruel Summer",
        artist: "Taylor Swift",
        duration: "2:58",
        imageUrl: "https://picsum.photos/seed/cruelsummer/128/128",
    },
    {
        id: 10,
        songName: "Peaches",
        artist: "Justin Bieber",
        duration: "3:18",
        imageUrl: "https://picsum.photos/seed/peaches/128/128",
    },
];
