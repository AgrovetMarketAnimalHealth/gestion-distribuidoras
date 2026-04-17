export interface Categoria {
  id: number
  nombre: string
  estado: boolean
  fecha_creacion: string
  fecha_actualizacion: string
}

export interface CategoriaFormData {
  nombre: string
  estado: boolean
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface PaginationLinks {
  first: string | null
  last: string | null
  prev: string | null
  next: string | null
}

export interface CategoriasPaginatedResponse {
  data: Categoria[]
  meta: PaginationMeta
  links: PaginationLinks
}

export interface CategoriasParams {
  page?: number
  per_page?: number
  search?: string
}
