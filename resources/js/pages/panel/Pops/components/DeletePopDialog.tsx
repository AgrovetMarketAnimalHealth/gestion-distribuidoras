"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { popService } from "../services/pop.service"
import type { Pop } from "../types/pop.types"

interface DeletePopDialogProps {
  pop: Pop
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeleted?: (id: string) => void
}

export function DeletePopDialog({
  pop,
  open,
  onOpenChange,
  onDeleted,
}: DeletePopDialogProps) {
  const [isLoading, setIsLoading] = React.useState(false)

  async function handleDelete() {
    setIsLoading(true)
    try {
      await popService.destroy(pop.id)
      toast.success("Pop eliminado exitosamente.")
      onDeleted?.(pop.id)
      onOpenChange(false)
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Error al eliminar el pop."
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar Pop?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar{" "}
            <span className="font-medium text-foreground">"{pop.nombre}"</span>.
            Esta acción se puede revertir restaurando el registro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}