import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { updatePopSchema, type UpdatePopFormValues } from "../schemas/pop.schema"
import { popService } from "../services/pop.service"
import type { Pop } from "../types/pop.types"

interface EditPopDialogProps {
  pop: Pop
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdated?: (pop: Pop) => void
}

export function EditPopDialog({
  pop,
  open,
  onOpenChange,
  onUpdated,
}: EditPopDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<UpdatePopFormValues>({
    resolver: zodResolver(updatePopSchema),
    defaultValues: {
      nombre: pop.nombre,
      estado: pop.estado,
    },
  })

  // Reset form cuando cambia el pop seleccionado
  React.useEffect(() => {
    form.reset({
      nombre: pop.nombre,
      estado: pop.estado,
    })
  }, [pop, form])

  async function onSubmit(values: UpdatePopFormValues) {
    setIsLoading(true)
    try {
      const updated = await popService.update(pop.id, values)
      toast.success("Pop actualizado exitosamente.")
      onUpdated?.(updated)
      onOpenChange(false)
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Error al actualizar el pop."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Pop</DialogTitle>
          <DialogDescription>
            Modifica los datos del pop seleccionado.
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
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Actualizando..." : "Actualizar"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}