import axios from "axios"
import type {
  Categoria,
  CategoriaFormData,
  CategoriasPaginatedResponse,
  CategoriasParams,
} from "../types/categoria.types"

const BASE_URL = "/categorias"

export const categoriaService = {
  async getAll(params: CategoriasParams = {}): Promise<CategoriasPaginatedResponse> {
    const { data } = await axios.get<CategoriasPaginatedResponse>(BASE_URL, {
      params: {
        page: params.page ?? 1,
        per_page: params.per_page ?? 15,
        ...(params.search ? { search: params.search } : {}),
      },
    })
    return data
  },

  async getById(id: number): Promise<Categoria> {
    const { data } = await axios.get<{ data: Categoria }>(`${BASE_URL}/${id}`)
    return data.data
  },

  async create(payload: CategoriaFormData): Promise<Categoria> {
    try {
      const { data } = await axios.post<{ data: Categoria }>(BASE_URL, payload)
      return data.data
    } catch (error) {
      // Re-lanzar el error para que el modal lo maneje
      throw error
    }
  },

  async update(id: number, payload: CategoriaFormData): Promise<Categoria> {
    try {
      const { data } = await axios.put<{ data: Categoria }>(`${BASE_URL}/${id}`, payload)
      return data.data
    } catch (error) {
      throw error
    }
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`)
  },

  async restore(id: number): Promise<Categoria> {
    const { data } = await axios.post<{ data: Categoria }>(`${BASE_URL}/${id}/restore`)
    return data.data
  },

  async deleteMultiple(ids: number[]): Promise<void> {
    // Mejor usar Promise.allSettled para no fallar todo si uno falla
    const results = await Promise.allSettled(
      ids.map((id) => axios.delete(`${BASE_URL}/${id}`))
    )
    const failed = results.filter(r => r.status === 'rejected')
    if (failed.length > 0) {
      throw new Error(`${failed.length} categoría(s) no se pudieron eliminar`)
    }
  },
}