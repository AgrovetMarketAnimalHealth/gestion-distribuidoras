export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Area {
    id: number;
    nombre: string;
    user_id: number;
    user?: User;
    created_by?: number;
    updated_by?: number;
    deleted_by?: number;
    created_at: string;
    updated_at: string;
    deleted_at?: string | null;
}

export interface AreaPaginated {
    data: Area[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    };
}

export interface AreaFilters {
    search?: string;
    user_id?: number | string;
    per_page?: number;
    page?: number;
}