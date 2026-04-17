"use client"

import { toast } from "sonner"
import { IconLoader2, IconTrash } from "@tabler/icons-react"
import * as React from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

import { categoriaService } from "../services/categoria.service"
import type { Categoria } from "../types/categoria.types"

interface CategoriaDeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categoria?: Categoria | null
  selectedIds?: number[]
  onSuccess: () => void
}

export function CategoriaDeleteDialog({
  open,
  onOpenChange,
  categoria,
  selectedIds = [],
  onSuccess,
}: CategoriaDeleteDialogProps) {
  const [loading, setLoading] = React.useState(false)

  const isBulk = selectedIds.length > 0
  const count = isBulk ? selectedIds.length : 1

  async function handleDelete() {
    setLoading(true)
    try {
      if (isBulk) {
        await categoriaService.deleteMultiple(selectedIds)
        toast.success(`${count} categoría(s) eliminada(s) exitosamente`)
      } else if (categoria) {
        await categoriaService.delete(categoria.id)
        toast.success("Categoría eliminada exitosamente")
      }
      onSuccess()
      onOpenChange(false)
    } catch {
      toast.error("Error al eliminar la(s) categoría(s)")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isBulk
              ? `¿Eliminar ${count} categoría(s)?`
              : `¿Eliminar "${categoria?.nombre}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. La(s) categoría(s) serán eliminadas
            del sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancelar</AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete} disabled={loading}>
            {loading ? (
              <IconLoader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <IconTrash className="mr-2 size-4" />
            )}
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}