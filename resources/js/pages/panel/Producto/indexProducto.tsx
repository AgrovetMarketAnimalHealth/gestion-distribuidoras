import { Head } from '@inertiajs/react';
import productos from '@/routes/productos';

export default function Indexproductos() {
    return (
        <>
            <Head title="Productos" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Productos</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexproductos.layout = {
    breadcrumbs: [
        {
            title: 'Productos',
            href: productos.index(),
        },
    ],
};