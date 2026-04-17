import { z } from "zod"

export const categoriaSchema = z.object({
  id: z.number(),
  nombre: z.string(),
  estado: z.boolean(),
  fecha_creacion: z.string(),
  fecha_actualizacion: z.string(),
})

export const categoriaFormSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es requerido")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  estado: z.boolean({
    required_error: "El estado es requerido",
  }),
})

export type CategoriaFormValues = z.infer<typeof categoriaFormSchema>