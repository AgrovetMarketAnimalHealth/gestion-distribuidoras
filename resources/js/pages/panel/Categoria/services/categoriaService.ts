import { Categoria, CreateCategoria, UpdateCategoria } from "../types/categoria";

const API_URL = "/categorias";

export const categoriaService = {
    async getAll(params?: { search?: string; per_page?: number }): Promise<{ data: Categoria[]; links: any; meta: any }> {
        const queryParams = new URLSearchParams();
        if (params?.search) queryParams.append("search", params.search);
        if (params?.per_page) queryParams.append("per_page", params.per_page.toString());
        
        const url = queryParams.toString() ? `${API_URL}?${queryParams}` : API_URL;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al cargar categorías");
        return response.json();
    },

    async create(data: CreateCategoria): Promise<Categoria> {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Error al crear categoría");
        return response.json();
    },

    async update(id: number, data: UpdateCategoria): Promise<Categoria> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Error al actualizar categoría");
        return response.json();
    },

    async delete(id: number): Promise<void> {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Error al eliminar categoría");
    },

    async restore(id: number): Promise<Categoria> {
        const response = await fetch(`${API_URL}/${id}/restore`, {
            method: "POST",
        });
        if (!response.ok) throw new Error("Error al restaurar categoría");
        return response.json();
    },
};