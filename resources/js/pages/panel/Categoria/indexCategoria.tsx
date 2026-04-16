"use client";

import React, { useEffect, useState } from "react";
import { Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";
import { CategoriaTable } from "./components/CategoriaTable";
import { CategoriaFormDrawer } from "./components/CategoriaFormDrawer";
import { CategoriaViewDrawer } from "./components/CategoriaViewDrawer";
import { categoriaService } from "./services/categoriaService";
import { Categoria, CreateCategoria, UpdateCategoria } from "./types/categoria";
import categoria from "@/routes/categoria";

export default function IndexCategoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const loadCategorias = async () => {
        try {
            setLoading(true);
            const response = await categoriaService.getAll({ search: searchTerm });
            setCategorias(response.data);
        } catch (error) {
            toast.error("Error al cargar las categorías");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategorias();
    }, [searchTerm]);

    const handleCreate = async (data: CreateCategoria) => {
        setIsSubmitting(true);
        try {
            await categoriaService.create(data);
            toast.success("Categoría creada exitosamente");
            await loadCategorias();
            setFormOpen(false);
        } catch (error) {
            toast.error("Error al crear la categoría");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdate = async (data: UpdateCategoria) => {
        if (!selectedCategoria) return;
        setIsSubmitting(true);
        try {
            await categoriaService.update(selectedCategoria.id, data);
            toast.success("Categoría actualizada exitosamente");
            await loadCategorias();
            setFormOpen(false);
            setSelectedCategoria(null);
        } catch (error) {
            toast.error("Error al actualizar la categoría");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (categoria: Categoria) => {
        if (!confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) return;
        
        try {
            await categoriaService.delete(categoria.id);
            toast.success("Categoría eliminada exitosamente");
            await loadCategorias();
        } catch (error) {
            toast.error("Error al eliminar la categoría");
            console.error(error);
        }
    };

    const handleRestore = async (categoria: Categoria) => {
        try {
            await categoriaService.restore(categoria.id);
            toast.success("Categoría restaurada exitosamente");
            await loadCategorias();
        } catch (error) {
            toast.error("Error al restaurar la categoría");
            console.error(error);
        }
    };

    const openEditForm = (categoria: Categoria) => {
        setSelectedCategoria(categoria);
        setFormOpen(true);
    };

    const openViewDrawer = (categoria: Categoria) => {
        setSelectedCategoria(categoria);
        setViewOpen(true);
    };

    const closeForm = () => {
        setFormOpen(false);
        setSelectedCategoria(null);
    };

    return (
        <>
            <Head title="Categorías" />
            <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center justify-between px-4 lg:px-6">
                    <div>
                        <h1 className="text-xl font-semibold">Categorías</h1>
                        <p className="text-sm text-muted-foreground">
                            Administra las categorías de productos y servicios
                        </p>
                    </div>
                    <Button onClick={() => setFormOpen(true)} size="sm">
                        <IconPlus className="mr-2 size-4" />
                        Nueva Categoría
                    </Button>
                </div>

                <div className="px-4 lg:px-6">
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <div className="text-muted-foreground">Cargando categorías...</div>
                        </div>
                    ) : (
                        <CategoriaTable
                            data={categorias}
                            onView={openViewDrawer}
                            onEdit={openEditForm}
                            onDelete={handleDelete}
                            onRestore={handleRestore}
                            showRestore={false}
                        />
                    )}
                </div>
            </div>

            <CategoriaFormDrawer
                open={formOpen}
                onOpenChange={closeForm}
                onSubmit={selectedCategoria ? handleUpdate : handleCreate}
                initialData={selectedCategoria}
                isSubmitting={isSubmitting}
            />

            <CategoriaViewDrawer
                open={viewOpen}
                onOpenChange={setViewOpen}
                categoria={selectedCategoria}
            />
        </>
    );
}

IndexCategoria.layout = {
    breadcrumbs: [
        {
            title: "Categorías",
            href: categoria.index(),
        },
    ],
};