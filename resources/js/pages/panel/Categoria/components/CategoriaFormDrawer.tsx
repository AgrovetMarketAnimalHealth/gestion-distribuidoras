"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createCategoriaSchema, CreateCategoria, Categoria } from "../types/categoria";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoriaFormDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: CreateCategoria) => Promise<void>;
    initialData?: Categoria | null;
    isSubmitting?: boolean;
}

export function CategoriaFormDrawer({
    open,
    onOpenChange,
    onSubmit,
    initialData,
    isSubmitting = false,
}: CategoriaFormDrawerProps) {
    const isMobile = useIsMobile();
    const isEditing = !!initialData;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<CreateCategoria>({
        resolver: zodResolver(createCategoriaSchema),
        defaultValues: {
            nombre: "",
            estado: true,
        },
    });

    const estado = watch("estado");

    useEffect(() => {
        if (initialData) {
            setValue("nombre", initialData.nombre);
            setValue("estado", initialData.estado);
        } else {
            reset({
                nombre: "",
                estado: true,
            });
        }
    }, [initialData, setValue, reset]);

    const handleFormSubmit = async (data: CreateCategoria) => {
        await onSubmit(data);
        reset();
        onOpenChange(false);
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
            <DrawerContent>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <DrawerHeader className="gap-1">
                        <DrawerTitle>
                            {isEditing ? "Editar Categoría" : "Nueva Categoría"}
                        </DrawerTitle>
                        <DrawerDescription>
                            {isEditing
                                ? "Modifica los datos de la categoría"
                                : "Completa los datos para crear una nueva categoría"}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="nombre">
                                Nombre <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="nombre"
                                placeholder="Ej: Electrónica, Ropa, Hogar..."
                                {...register("nombre")}
                                className={errors.nombre ? "border-destructive" : ""}
                            />
                            {errors.nombre && (
                                <p className="text-sm text-destructive">{errors.nombre.message}</p>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col gap-1">
                                <Label htmlFor="estado">Estado</Label>
                                <p className="text-sm text-muted-foreground">
                                    {estado ? "Activo" : "Inactivo"}
                                </p>
                            </div>
                            <Switch
                                id="estado"
                                checked={estado}
                                onCheckedChange={(checked) => setValue("estado", checked)}
                            />
                        </div>
                    </div>
                    <DrawerFooter>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting
                                ? isEditing
                                    ? "Actualizando..."
                                    : "Creando..."
                                : isEditing
                                ? "Actualizar"
                                : "Crear"}
                        </Button>
                        <DrawerClose asChild>
                            <Button variant="outline" type="button">
                                Cancelar
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </DrawerContent>
        </Drawer>
    );
}