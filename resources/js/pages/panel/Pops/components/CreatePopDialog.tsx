"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IconPlus } from "@tabler/icons-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

import { createPopSchema, type CreatePopFormValues } from "../schemas/pop.schema"
import { popService } from "../services/pop.service"
import type { Pop } from "../types/pop.types"

interface CreatePopDialogProps {
  onCreated?: (pop: Pop) => void
}

export function CreatePopDialog({ onCreated }: CreatePopDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<CreatePopFormValues>({
    resolver: zodResolver(createPopSchema),
    defaultValues: {
      nombre: "",
      estado: true,
    },
  })

  async function onSubmit(values: CreatePopFormValues) {
    setIsLoading(true)
    try {
      const pop = await popService.store(values)
      toast.success("Pop creado exitosamente.")
      onCreated?.(pop)
      setOpen(false)
      form.reset()
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Error al crear el pop."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <IconPlus />
          <span className="hidden lg:inline">Agregar Pop</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo Pop</DialogTitle>
          <DialogDescription>
            Completa los campos para crear un nuevo pop.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Field name="nombre">
              <FieldLabel>Nombre</FieldLabel>
              <FieldContent>
                <Input
                  placeholder="Nombre del pop"
                  value={form.watch("nombre")}
                  onChange={(e) => form.setValue("nombre", e.target.value)}
                  onBlur={() => form.trigger("nombre")}
                />
              </FieldContent>
              {form.formState.errors.nombre && (
                <FieldError>{form.formState.errors.nombre.message}</FieldError>
              )}
            </Field>

            <Field name="estado">
              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FieldLabel>Estado</FieldLabel>
                  <p className="text-sm text-muted-foreground">
                    {form.watch("estado") ? "Activo" : "Inactivo"}
                  </p>
                </div>
                <FieldContent>
                  <Switch
                    checked={form.watch("estado")}
                    onCheckedChange={(checked) => form.setValue("estado", checked)}
                  />
                </FieldContent>
              </div>
              {form.formState.errors.estado && (
                <FieldError>{form.formState.errors.estado.message}</FieldError>
              )}
            </Field>

            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Guardando..." : "Guardar"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}