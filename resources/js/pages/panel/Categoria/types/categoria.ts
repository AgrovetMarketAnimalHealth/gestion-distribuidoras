import { z } from "zod";

export const categoriaSchema = z.object({
    id: z.number(),
    nombre: z.string(),
    estado: z.boolean(),
    fecha_creacion: z.string(),
    fecha_actualizacion: z.string(),
});

// Para crear - NO incluimos user_id porque se asigna automáticamente en el backend
export const createCategoriaSchema = z.object({
    nombre: z.string().min(1, "El nombre es requerido").max(255),
    estado: z.boolean(),
});

// Para actualizar - mismo esquema
export const updateCategoriaSchema = createCategoriaSchema;

export type Categoria = z.infer<typeof categoriaSchema>;
export type CreateCategoria = z.infer<typeof createCategoriaSchema>;
export type UpdateCategoria = z.infer<typeof updateCategoriaSchema>;