"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
  type Row,
} from "@tanstack/react-table"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLoader,
  IconLoader2,
  IconPencil,
  IconPlus,
  IconGripVertical,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react"
import { useDebounce } from "use-debounce"
import { toast } from "sonner"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { categoriaService } from "../services/categoria.service"
import type { Categoria, PaginationMeta } from "../types/categoria.types"
import { CategoriaModal } from "./CategoriaModal"
import { CategoriaDeleteDialog } from "./CategoriaDeleteDialog"

// Componente DragHandle igual que el original
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent cursor-grab active:cursor-grabbing"
    >
      <IconGripVertical className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// Componente DraggableRow - ¡esto es lo que faltaba!
function DraggableRow({ row }: { row: Row<Categoria> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function CategoriaDataTable() {
  const [data, setData] = React.useState<Categoria[]>([])
  const [meta, setMeta] = React.useState<PaginationMeta | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const [page, setPage] = React.useState(1)
  const [perPage, setPerPage] = React.useState(15)
  const [search, setSearch] = React.useState("")
  const [debouncedSearch] = useDebounce(search, 400)

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  const [modalOpen, setModalOpen] = React.useState(false)
  const [editingCategoria, setEditingCategoria] = React.useState<Categoria | null>(null)

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [deletingCategoria, setDeletingCategoria] = React.useState<Categoria | null>(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = React.useState(false)

  // Configuración de sensores para dnd-kit
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const sortableId = React.useId()

  const fetchData = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await categoriaService.getAll({
        page,
        per_page: perPage,
        search: debouncedSearch || undefined,
      })
      setData(response.data)
      setMeta(response.meta)
      setRowSelection({})
    } catch {
      toast.error("Error al cargar las categorías")
    } finally {
      setIsLoading(false)
    }
  }, [page, perPage, debouncedSearch])

  React.useEffect(() => {
    fetchData()
  }, [fetchData])

  React.useEffect(() => {
    setPage(1)
  }, [debouncedSearch, perPage])

  // IDs para SortableContext
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  // Manejador de drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        const reordered = arrayMove(data, oldIndex, newIndex)
        
        // Aquí puedes llamar a tu API para guardar el nuevo orden
        // categoriaService.reorder(reordered.map(item => item.id))
        
        return reordered
      })
    }
  }

  const columns: ColumnDef<Categoria>[] = [
    {
      id: "drag",
      header: () => null,
      cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Seleccionar todos"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Seleccionar fila"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nombre",
      header: "Nombre",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.nombre}</span>
      ),
    },
    {
      accessorKey: "estado",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant="outline" className="px-1.5 text-muted-foreground">
          {row.original.estado ? (
            <>
              <IconCircleCheckFilled className="mr-1 fill-green-500 dark:fill-green-400 size-3.5" />
              Activo
            </>
          ) : (
            <>
              <IconLoader className="mr-1 size-3.5" />
              Inactivo
            </>
          )}
        </Badge>
      ),
    },
    {
      accessorKey: "fecha_creacion",
      header: "Fecha creación",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.original.fecha_creacion}</span>
      ),
    },
    {
      accessorKey: "fecha_actualizacion",
      header: "Última actualización",
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.original.fecha_actualizacion}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
              size="icon"
            >
              <IconDotsVertical />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => {
                setEditingCategoria(row.original)
                setModalOpen(true)
              }}
            >
              <IconPencil className="mr-2 size-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setDeletingCategoria(row.original)
                setDeleteDialogOpen(true)
              }}
            >
              <IconTrash className="mr-2 size-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta?.last_page ?? 1,
  })

  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((r) => r.original.id)

  const canPrev = page > 1
  const canNext = meta ? page < meta.last_page : false

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-4 lg:px-6">
        <div className="relative w-full max-w-sm">
          <IconSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 pr-8"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <IconX className="size-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.length > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setBulkDeleteOpen(true)}
            >
              <IconTrash className="mr-1.5 size-4" />
              Eliminar ({selectedIds.length})
            </Button>
          )}
          <Button
            size="sm"
            onClick={() => {
              setEditingCategoria(null)
              setModalOpen(true)
            }}
          >
            <IconPlus className="mr-1.5 size-4" />
            Nueva categoría
          </Button>
        </div>
      </div>

      {/* Table con DndContext */}
      <div className="overflow-hidden rounded-lg border mx-4 lg:mx-6">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-32 text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <IconLoader2 className="size-5 animate-spin" />
                      Cargando...
                    </div>
                  </TableCell>
                </TableRow>
              ) : table.getRowModel().rows.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                    No se encontraron categorías.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {selectedIds.length > 0
            ? `${selectedIds.length} de ${meta?.total ?? 0} fila(s) seleccionada(s).`
            : `Total: ${meta?.total ?? 0} categoría(s).`}
        </div>

        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Filas por página
            </Label>
            <Select
              value={`${perPage}`}
              onValueChange={(value) => setPerPage(Number(value))}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={perPage} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 15, 20, 30, 50].map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {page} de {meta?.last_page ?? 1}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => setPage(1)}
              disabled={!canPrev}
            >
              <span className="sr-only">Primera página</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => setPage((p) => p - 1)}
              disabled={!canPrev}
            >
              <span className="sr-only">Página anterior</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => setPage((p) => p + 1)}
              disabled={!canNext}
            >
              <span className="sr-only">Página siguiente</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => setPage(meta?.last_page ?? 1)}
              disabled={!canNext}
            >
              <span className="sr-only">Última página</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CategoriaModal
        open={modalOpen}
        onOpenChange={(open) => {
          setModalOpen(open)
          if (!open) setEditingCategoria(null)
        }}
        categoria={editingCategoria}
        onSuccess={fetchData}
      />

      <CategoriaDeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          setDeleteDialogOpen(open)
          if (!open) setDeletingCategoria(null)
        }}
        categoria={deletingCategoria}
        onSuccess={fetchData}
      />

      <CategoriaDeleteDialog
        open={bulkDeleteOpen}
        onOpenChange={setBulkDeleteOpen}
        selectedIds={selectedIds}
        onSuccess={() => {
          fetchData()
          setRowSelection({})
        }}
      />
    </div>
  )
}