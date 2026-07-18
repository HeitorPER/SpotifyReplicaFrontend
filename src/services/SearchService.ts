import { apiFetch } from "./httpClient";
import type { SearchResults } from "../types/SearchResults";

export function search(query: string): Promise<SearchResults> {
    return apiFetch(`/search?q=${encodeURIComponent(query)}`);
}

