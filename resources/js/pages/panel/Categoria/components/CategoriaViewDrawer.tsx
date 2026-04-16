"use client";

import React from "react";
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
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Categoria } from "../types/categoria";
import { useIsMobile } from "@/hooks/use-mobile";

interface CategoriaViewDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    categoria: Categoria | null;
}

export function CategoriaViewDrawer({
    open,
    onOpenChange,
    categoria,
}: CategoriaViewDrawerProps) {
    const isMobile = useIsMobile();

    if (!categoria) return null;

    return (
        <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
            <DrawerContent>
                <DrawerHeader className="gap-1">
                    <DrawerTitle>Detalles de Categoría</DrawerTitle>
                    <DrawerDescription>
                        Información completa de la categoría
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 text-sm">
                    <div className="grid gap-3">
                        <div>
                            <h3 className="font-medium text-muted-foreground text-sm">ID</h3>
                            <p className="mt-1">{categoria.id}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-muted-foreground text-sm">Nombre</h3>
                            <p className="mt-1 font-medium">{categoria.nombre}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-muted-foreground text-sm">Estado</h3>
                            <div className="mt-1">
                                <Badge variant={categoria.estado ? "default" : "secondary"}>
                                    {categoria.estado ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-muted-foreground text-sm">
                                Fecha de Creación
                            </h3>
                            <p className="mt-1">{categoria.fecha_creacion}</p>
                        </div>
                        <Separator />
                        <div>
                            <h3 className="font-medium text-muted-foreground text-sm">
                                Última Actualización
                            </h3>
                            <p className="mt-1">{categoria.fecha_actualizacion}</p>
                        </div>
                    </div>
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}