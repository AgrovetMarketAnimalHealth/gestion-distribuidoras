import { useState, useEffect, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Area, AreaFilters, AreaPaginated } from './types/area';
import { areaService } from './services/areaService';
import { StoreAreaSchema } from './schemas/areaSchema';
import { AreaTable } from './components/AreaTable';
import { AreaForm } from './components/AreaForm';
import { AreaDeleteDialog } from './components/AreaDeleteDialog';
import { AreaFiltersBar } from './components/AreaFiltersBar';
import { AreaPagination } from './components/AreaPagination';

import areas from '@/routes/areas';

// Ajusta según tu fuente real de usuarios (puede venir como prop de Inertia)
import { usePage } from '@inertiajs/react';

export default function IndexAreas() {
    const { props } = usePage<{ users?: { id: number; name: string; email: string }[] }>();
    const users = props.users ?? [];

    const [paginated, setPaginated] = useState<AreaPaginated | null>(null);
    const [filters, setFilters] = useState<AreaFilters>({ per_page: 15, page: 1 });
    const [isLoading, setIsLoading] = useState(false);
    const [isMutating, setIsMutating] = useState(false);

    // Modal state
    const [formOpen, setFormOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);

    const fetchAreas = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await areaService.index(filters);
            setPaginated(data);
        } catch {
            toast.error('Error al cargar las áreas');
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetchAreas();
        }, 300);
        return () => clearTimeout(timeout);
    }, [fetchAreas]);

    // CRUD handlers
    const handleCreate = () => {
        setSelectedArea(null);
        setFormOpen(true);
    };

    const handleEdit = (area: Area) => {
        setSelectedArea(area);
        setFormOpen(true);
    };

    const handleFormSubmit = async (data: StoreAreaSchema) => {
        setIsMutating(true);
        try {
            if (selectedArea) {
                await areaService.update(selectedArea.id, data);
                toast.success('Área actualizada correctamente');
            } else {
                await areaService.store(data);
                toast.success('Área creada correctamente');
            }
            setFormOpen(false);
            fetchAreas();
        } catch (error: any) {
            const msg =
                error?.response?.data?.message ??
                'Error al guardar el área';
            toast.error(msg);
        } finally {
            setIsMutating(false);
        }
    };

    const handleDelete = (area: Area) => {
        setAreaToDelete(area);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!areaToDelete) return;
        setIsMutating(true);
        try {
            await areaService.destroy(areaToDelete.id);
            toast.success('Área eliminada');
            setDeleteOpen(false);
            fetchAreas();
        } catch {
            toast.error('Error al eliminar el área');
        } finally {
            setIsMutating(false);
        }
    };

    const handleRestore = async (area: Area) => {
        try {
            await areaService.restore(area.id);
            toast.success('Área restaurada');
            fetchAreas();
        } catch {
            toast.error('Error al restaurar el área');
        }
    };

    const handlePageChange = (page: number) => {
        setFilters((prev) => ({ ...prev, page }));
    };

    return (
        <>
            <Head title="Áreas" />

            <div className="flex flex-col gap-6 py-6">
                {/* Header */}
                <div className="flex items-start justify-between px-4 lg:px-6">
                    <div>
                        <h1 className="text-xl font-semibold">Áreas</h1>
                        <p className="text-sm text-muted-foreground">
                            Gestiona todas las áreas del sistema.
                        </p>
                    </div>
                    <Button onClick={handleCreate} size="sm" className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nueva área
                    </Button>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 px-4 lg:px-6">
                    <AreaFiltersBar filters={filters} onChange={setFilters} />

                    <AreaTable
                        areas={paginated?.data ?? []}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onRestore={handleRestore}
                        isLoading={isLoading}
                    />

                    {paginated?.meta && (
                        <AreaPagination
                            meta={paginated.meta}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>

            {/* Modals */}
            <AreaForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                area={selectedArea}
                users={users}
                isLoading={isMutating}
            />

            <AreaDeleteDialog
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDeleteConfirm}
                area={areaToDelete}
                isLoading={isMutating}
            />
        </>
    );
}

IndexAreas.layout = {
    breadcrumbs: [
        {
            title: 'Áreas',
            href: areas.index(),
        },
    ],
};