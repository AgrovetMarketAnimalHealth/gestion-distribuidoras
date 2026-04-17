import { z } from "zod"

export const createPopSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio." })
    .min(1, "El nombre es obligatorio.")
    .max(255, "El nombre no debe superar los 255 caracteres."),
  estado: z.boolean({
    required_error: "El estado es obligatorio.",
    invalid_type_error: "El estado debe ser verdadero o falso.",
  }),
})

export const updatePopSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es obligatorio." })
    .min(1, "El nombre es obligatorio.")
    .max(255, "El nombre no debe superar los 255 caracteres."),
  estado: z.boolean({
    required_error: "El estado es obligatorio.",
    invalid_type_error: "El estado debe ser verdadero o falso.",
  }),
})

export type CreatePopFormValues = z.infer<typeof createPopSchema>
export type UpdatePopFormValues = z.infer<typeof updatePopSchema>