"use client"

import * as React from "react"
import { toast } from "sonner"
import { IconLoader2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useIsMobile } from "@/hooks/use-mobile" // ← Importar el hook

import { categoriaFormSchema } from "../schemas/categoria.schema"
import { categoriaService } from "../services/categoria.service"
import type { Categoria } from "../types/categoria.types"

interface CategoriaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoria?: Categoria | null
  onSuccess: () => void
}

export function CategoriaModal({
  open,
  onOpenChange,
  categoria,
  onSuccess,
}: CategoriaModalProps) {
  const isEditing = !!categoria
  const isMobile = useIsMobile() // ← Usar el hook

  const [nombre, setNombre] = React.useState("")
  const [estado, setEstado] = React.useState(true)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [errorNombre, setErrorNombre] = React.useState<string>("")

  React.useEffect(() => {
    if (open) {
      if (categoria) {
        setNombre(categoria.nombre)
        setEstado(categoria.estado)
      } else {
        setNombre("")
        setEstado(true)
      }
      setErrorNombre("")
    }
  }, [open, categoria])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setErrorNombre("")

    if (!nombre || nombre.trim() === "") {
      setErrorNombre("El nombre es requerido")
      return
    }

    try {
      const result = categoriaFormSchema.safeParse({ nombre, estado })

      if (!result.success) {
        if (result.error && result.error.errors) {
          const nombreError = result.error.errors.find(err => err.path[0] === "nombre")
          if (nombreError) {
            setErrorNombre(nombreError.message)
          } else {
            toast.error("Por favor, revisa los campos")
          }
        } else {
          toast.error("Datos inválidos")
        }
        return
      }
    } catch (err) {
      console.error("Error de validación:", err)
      toast.error("Error al validar los datos")
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditing && categoria) {
        await categoriaService.update(categoria.id, { nombre, estado })
        toast.success("Categoría actualizada exitosamente")
      } else {
        await categoriaService.create({ nombre, estado })
        toast.success("Categoría creada exitosamente")
      }
      onSuccess()
      onOpenChange(false)
    } catch (error: any) {
      console.error("Error:", error)

      if (error?.response?.status === 422) {
        const backendErrors = error.response.data?.errors

        if (backendErrors && backendErrors.nombre) {
          const msg = Array.isArray(backendErrors.nombre)
            ? backendErrors.nombre[0]
            : backendErrors.nombre
          setErrorNombre(msg)
        } else if (backendErrors && backendErrors.message) {
          toast.error(backendErrors.message)
        } else {
          toast.error(error.response.data?.message || "Error de validación")
        }
      } else {
        const msg =
          error?.response?.data?.message ??
          (isEditing ? "Error al actualizar la categoría" : "Error al crear la categoría")
        toast.error(msg)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Drawer 
      open={open} 
      onOpenChange={onOpenChange}
      direction={isMobile ? 'bottom' : 'right'} // ← Agregar esta línea
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{isEditing ? "Editar categoría" : "Nueva categoría"}</DrawerTitle>
          <DrawerDescription>
            {isEditing
              ? "Modifica los datos de la categoría."
              : "Completa los datos para crear una nueva categoría."}
          </DrawerDescription>
        </DrawerHeader>

        <form onSubmit={handleSubmit} className="px-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nombre">
                Nombre <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id="nombre"
                placeholder="Nombre de la categoría"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value)
                  if (errorNombre) setErrorNombre("")
                }}
                disabled={isSubmitting}
                className={errorNombre ? "border-red-500" : ""}
              />
              {errorNombre && (
                <p className="text-sm text-red-500 mt-1">{errorNombre}</p>
              )}
            </Field>

            <Field className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div className="space-y-0.5">
                <FieldLabel htmlFor="estado">Estado</FieldLabel>
                <FieldDescription>
                  {estado ? "Activo" : "Inactivo"}
                </FieldDescription>
              </div>
              <Switch
                id="estado"
                checked={estado}
                onCheckedChange={setEstado}
                disabled={isSubmitting}
              />
            </Field>
          </FieldGroup>
        </form>

        <DrawerFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && (
              <IconLoader2 className="mr-2 size-4 animate-spin" />
            )}
            {isEditing ? "Guardar cambios" : "Crear categoría"}
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              onClick={() => {
                setNombre("")
                setEstado(true)
                setErrorNombre("")
                onOpenChange(false)
              }}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}