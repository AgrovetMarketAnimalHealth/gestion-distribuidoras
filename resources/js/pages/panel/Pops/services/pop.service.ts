import axios from "axios"
import type {
  Pop,
  PopFilters,
  PopPaginated,
  CreatePopPayload,
  UpdatePopPayload,
} from "../types/pop.types"

const BASE = "/pop"

export const popService = {
  /**
   * Listar pops con paginación y filtros
   */
  async index(filters?: PopFilters): Promise<PopPaginated> {
    const { data } = await axios.get<PopPaginated>(BASE, { params: filters })
    return data
  },

  /**
   * Obtener un pop por ID
   */
  async show(id: string): Promise<Pop> {
    const { data } = await axios.get<{ data: Pop }>(`${BASE}/${id}`)
    return data.data
  },

  /**
   * Crear un nuevo pop
   */
  async store(payload: CreatePopPayload): Promise<Pop> {
    const { data } = await axios.post<{ data: Pop }>(BASE, payload)
    return data.data
  },

  /**
   * Actualizar un pop existente
   */
  async update(id: string, payload: UpdatePopPayload): Promise<Pop> {
    const { data } = await axios.put<{ data: Pop }>(`${BASE}/${id}`, payload)
    return data.data
  },

  /**
   * Eliminar (soft delete) un pop
   */
  async destroy(id: string): Promise<void> {
    await axios.delete(`${BASE}/${id}`)
  },

  /**
   * Restaurar un pop eliminado
   */
  async restore(id: string): Promise<Pop> {
    const { data } = await axios.post<{ data: Pop }>(`${BASE}/${id}/restore`)
    return data.data
  },
}