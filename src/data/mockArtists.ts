import type { Artist } from "../types/Artist";

export function getArtistName(artistId: string): string {
    return mockArtists.find(a => a.artist_id === artistId)?.artist_name ?? artistId;
}

export const mockArtists: Artist[] = [
    {
        artist_id: "f1e2d3c4-0001-4b5a-9c8d-artist0000001",
        artist_name: "The Weeknd",
        about: "Cantor e compositor canadense conhecido por misturar R&B, pop e synth-wave.",
        num_listeners: 111234567,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0002-4b5a-9c8d-artist0000002",
        artist_name: "Harry Styles",
        about: "Artista britânico ex-integrante do One Direction, famoso por seu estilo único e pop alternativo.",
        num_listeners: 54321098,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0003-4b5a-9c8d-artist0000003",
        artist_name: "Miley Cyrus",
        about: "Cantora e atriz americana com carreira que vai do pop ao rock alternativo.",
        num_listeners: 47890123,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0004-4b5a-9c8d-artist0000004",
        artist_name: "Dua Lipa",
        about: "Cantora albanesa-britânica conhecida pelos hits de dance-pop e nu-disco.",
        num_listeners: 83456789,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0005-4b5a-9c8d-artist0000005",
        artist_name: "The Kid LAROI",
        about: "Rapper e cantor australiano que se tornou famoso com colaborações internacionais.",
        num_listeners: 38901234,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0006-4b5a-9c8d-artist0000006",
        artist_name: "Glass Animals",
        about: "Banda de indie pop britânica conhecida pelo som psicodélico e letras introspectivas.",
        num_listeners: 28901234,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0007-4b5a-9c8d-artist0000007",
        artist_name: "Billie Eilish",
        about: "Cantora e compositora americana que se tornou fenômeno global com seu pop sombrio e minimalista.",
        num_listeners: 72345678,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0008-4b5a-9c8d-artist0000008",
        artist_name: "BTS",
        about: "Grupo de K-pop sul-coreano com um exército de fãs global e inúmeros recordes mundiais.",
        num_listeners: 65432100,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0009-4b5a-9c8d-artist0000009",
        artist_name: "Taylor Swift",
        about: "Cantora e compositora americana, uma das artistas mais premiadas e influentes da história da música pop.",
        num_listeners: 104567890,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
    {
        artist_id: "f1e2d3c4-0010-4b5a-9c8d-artist0000010",
        artist_name: "Justin Bieber",
        about: "Cantor canadense que se tornou estrela global ainda na adolescência com seu pop dançante.",
        num_listeners: 61234567,
        created_at: "2024-01-01T10:00:00.000Z",
        updated_at: "2024-01-01T10:00:00.000Z",
    },
];
