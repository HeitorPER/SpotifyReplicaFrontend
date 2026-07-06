import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

interface PlayContext {
    playlistId?: string;
    albumId?: string;
}

interface PlayerContextValue {
    songId: string | null;
    playlistId: string | null;
    albumId: string | null;
    play: (songId: string, context?: PlayContext) => void;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
    const [songId, setSongId] = useState<string | null>(null);
    const [playlistId, setPlaylistId] = useState<string | null>(null);
    const [albumId, setAlbumId] = useState<string | null>(null);

    const play = (nextSongId: string, context?: PlayContext) => {
        setSongId(nextSongId);
        setPlaylistId(context?.playlistId ?? null);
        setAlbumId(context?.albumId ?? null);
    };

    const value = useMemo(
        () => ({ songId, playlistId, albumId, play }),
        [songId, playlistId, albumId]
    );

    return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerContextValue {
    const context = useContext(PlayerContext);
    if (!context) throw new Error("usePlayer deve ser usado dentro de um PlayerProvider");
    return context;
}
