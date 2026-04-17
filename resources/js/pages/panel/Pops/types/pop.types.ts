export interface Pop {
  id: string
  nombre: string
  estado: boolean
  fecha_creacion: string
  fecha_actualizacion: string
  user?: {
    id: string
    name: string
    email: string
  }
}

export interface PopPaginated {
  data: Pop[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  links: {
    first: string | null
    last: string | null
    prev: string | null
    next: string | null
  }
}

export interface PopFilters {
  search?: string
  user_id?: string
  per_page?: number
  page?: number
}

export interface CreatePopPayload {
  nombre: string
  estado: boolean
}

export interface UpdatePopPayload {
  nombre: string
  estado: boolean
}