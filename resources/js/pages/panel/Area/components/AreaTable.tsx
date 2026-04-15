import { Area } from '../types/area';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Pencil, Trash2, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface AreaTableProps {
    areas: Area[];
    onEdit: (area: Area) => void;
    onDelete: (area: Area) => void;
    onRestore: (area: Area) => void;
    isLoading?: boolean;
}

export function AreaTable({
    areas,
    onEdit,
    onDelete,
    onRestore,
    isLoading = false,
}: AreaTableProps) {
    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-16 text-muted-foreground text-sm">
                Cargando áreas...
            </div>
        );
    }

    if (areas.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-2">
                <p className="text-sm">No se encontraron áreas.</p>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[60px]">#</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Responsable</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Creado</TableHead>
                        <TableHead className="w-[60px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {areas.map((area) => (
                        <TableRow
                            key={area.id}
                            className={
                                area.deleted_at ? 'opacity-60' : undefined
                            }
                        >
                            <TableCell className="text-muted-foreground text-xs">
                                {area.id}
                            </TableCell>
                            <TableCell className="font-medium">
                                {area.nombre}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                                {area.user?.name ?? '—'}
                            </TableCell>
                            <TableCell>
                                {area.deleted_at ? (
                                    <Badge variant="destructive">
                                        Eliminada
                                    </Badge>
                                ) : (
                                    <Badge variant="default">Activa</Badge>
                                )}
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                                {format(
                                    new Date(area.created_at),
                                    'dd MMM yyyy',
                                    { locale: es },
                                )}
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                        >
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">
                                                Acciones
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        {!area.deleted_at ? (
                                            <>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onEdit(area)
                                                    }
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        onDelete(area)
                                                    }
                                                    className="text-destructive focus:text-destructive"
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </>
                                        ) : (
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    onRestore(area)
                                                }
                                            >
                                                <RotateCcw className="mr-2 h-4 w-4" />
                                                Restaurar
                                            </DropdownMenuItem>
                                        )}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
