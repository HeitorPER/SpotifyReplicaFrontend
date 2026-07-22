import { useSortable } from "@dnd-kit/react/sortable";
import { MusicCard, type MusicCardProps } from "./MusicCard";

interface SortableMusicCardProps extends MusicCardProps {
    id: string;
    index: number;
}

export function SortableMusicCard({ id, index, ...musicCardProps }: SortableMusicCardProps) {
    const { ref, isDragging } = useSortable({ id, index });

    return <MusicCard ref={ref} isDragging={isDragging} {...musicCardProps} />;
}
