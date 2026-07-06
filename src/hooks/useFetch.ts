import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function useFetch<T>(fetchFn: () => Promise<T>, deps: unknown[] = []): FetchState<T> {
    const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

    useEffect(() => {
        let cancelled = false;
        setState({ data: null, loading: true, error: null });

        fetchFn()
            .then((data) => {
                if (!cancelled) setState({ data, loading: false, error: null });
            })
            .catch((error: Error) => {
                if (!cancelled) setState({ data: null, loading: false, error });
            });

        return () => {
            cancelled = true;
        };
    }, deps);

    return state;
}