import type { Artist } from "../types/Artist";

export function getArtistName(artistId: string): string {
    return mockArtists.find(a => a.id === artistId)?.name ?? artistId;
}

export const mockArtists: Artist[] = [
    {
        id: "f1e2d3c4-0001-4b5a-9c8d-artist0000001",
        name: "The Weeknd",
        about: "Cantor e compositor canadense conhecido por misturar R&B, pop e synth-wave.",
        listeners: 111234567,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0002-4b5a-9c8d-artist0000002",
        name: "Harry Styles",
        about: "Artista britânico ex-integrante do One Direction, famoso por seu estilo único e pop alternativo.",
        listeners: 54321098,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0003-4b5a-9c8d-artist0000003",
        name: "Miley Cyrus",
        about: "Cantora e atriz americana com carreira que vai do pop ao rock alternativo.",
        listeners: 47890123,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0004-4b5a-9c8d-artist0000004",
        name: "Dua Lipa",
        about: "Cantora albanesa-britânica conhecida pelos hits de dance-pop e nu-disco.",
        listeners: 83456789,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0005-4b5a-9c8d-artist0000005",
        name: "The Kid LAROI",
        about: "Rapper e cantor australiano que se tornou famoso com colaborações internacionais.",
        listeners: 38901234,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0006-4b5a-9c8d-artist0000006",
        name: "Glass Animals",
        about: "Banda de indie pop britânica conhecida pelo som psicodélico e letras introspectivas.",
        listeners: 28901234,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0007-4b5a-9c8d-artist0000007",
        name: "Billie Eilish",
        about: "Cantora e compositora americana que se tornou fenômeno global com seu pop sombrio e minimalista.",
        listeners: 72345678,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0008-4b5a-9c8d-artist0000008",
        name: "BTS",
        about: "Grupo de K-pop sul-coreano com um exército de fãs global e inúmeros recordes mundiais.",
        listeners: 65432100,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0009-4b5a-9c8d-artist0000009",
        name: "Taylor Swift",
        about: "Cantora e compositora americana, uma das artistas mais premiadas e influentes da história da música pop.",
        listeners: 104567890,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
    {
        id: "f1e2d3c4-0010-4b5a-9c8d-artist0000010",
        name: "Justin Bieber",
        about: "Cantor canadense que se tornou estrela global ainda na adolescência com seu pop dançante.",
        listeners: 61234567,
        createdAt: "2024-01-01T10:00:00.000Z",
        updatedAt: "2024-01-01T10:00:00.000Z",
    },
];
