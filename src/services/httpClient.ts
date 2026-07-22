const BASE_URL = import.meta.env.VITE_API_URL

export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
    body?: unknown
}

export async function apiFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { method = "GET", body } = options

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        throw new ApiError(`Erro ${response.status} ao acessar ${endpoint}`, response.status)
    }

    if (response.status === 204) {
        return undefined as T
    }

    const text = await response.text()
    return (text ? JSON.parse(text) : undefined) as T
}