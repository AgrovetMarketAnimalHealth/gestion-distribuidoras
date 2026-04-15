import { z } from 'zod';

export const storeAreaSchema = z.object({
    nombre: z
        .string()
        .min(1, 'El nombre es requerido')
        .max(255, 'El nombre no puede superar los 255 caracteres'),
    user_id: z
        .number({ invalid_type_error: 'Debe seleccionar un usuario' })
        .min(1, 'El usuario es requerido'),
});

export const updateAreaSchema = z.object({
    nombre: z
        .string()
        .min(1, 'El nombre es requerido')
        .max(255, 'El nombre no puede superar los 255 caracteres'),
    user_id: z
        .number({ invalid_type_error: 'Debe seleccionar un usuario' })
        .min(1, 'El usuario es requerido'),
});

export type StoreAreaSchema = z.infer<typeof storeAreaSchema>;
export type UpdateAreaSchema = z.infer<typeof updateAreaSchema>;