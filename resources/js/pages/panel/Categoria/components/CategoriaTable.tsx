"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    IconDotsVertical,
    IconEdit,
    IconTrash,
    IconEye,
    IconRestore,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Categoria } from "../types/categoria";

interface CategoriaTableProps {
    data: Categoria[];
    onView: (categoria: Categoria) => void;
    onEdit: (categoria: Categoria) => void;
    onDelete: (categoria: Categoria) => void;
    onRestore?: (categoria: Categoria) => void;
    showRestore?: boolean;
}

export function CategoriaTable({
    data,
    onView,
    onEdit,
    onDelete,
    onRestore,
    showRestore = false,
}: CategoriaTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const columns: ColumnDef<Categoria>[] = [
        {
            accessorKey: "nombre",
            header: "Nombre",
            cell: ({ row }) => (
                <div className="font-medium">{row.getValue("nombre")}</div>
            ),
        },
        {
            accessorKey: "estado",
            header: "Estado",
            cell: ({ row }) => {
                const estado = row.getValue("estado") as boolean;
                return (
                    <Badge variant={estado ? "default" : "secondary"}>
                        {estado ? "Activo" : "Inactivo"}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "fecha_creacion",
            header: "Fecha Creación",
            cell: ({ row }) => (
                <div className="text-muted-foreground text-sm">
                    {row.getValue("fecha_creacion")}
                </div>
            ),
        },
        {
            accessorKey: "fecha_actualizacion",
            header: "Última Actualización",
            cell: ({ row }) => (
                <div className="text-muted-foreground text-sm">
                    {row.getValue("fecha_actualizacion")}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Acciones",
            cell: ({ row }) => {
                const categoria = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="size-8 p-0">
                                <IconDotsVertical className="size-4" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(categoria)}>
                                <IconEye className="mr-2 size-4" />
                                Ver
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(categoria)}>
                                <IconEdit className="mr-2 size-4" />
                                Editar
                            </DropdownMenuItem>
                            {showRestore && !categoria.estado && onRestore ? (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => onRestore(categoria)}>
                                        <IconRestore className="mr-2 size-4" />
                                        Restaurar
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => onDelete(categoria)}
                                        className="text-destructive"
                                    >
                                        <IconTrash className="mr-2 size-4" />
                                        Eliminar
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Buscar categoría..."
                    value={(table.getColumn("nombre")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("nombre")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef.header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No se encontraron categorías.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}