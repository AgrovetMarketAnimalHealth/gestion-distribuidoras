import { Head } from '@inertiajs/react';
import categoria from '@/routes/categoria';

export default function Indexcategoria() {
    return (
        <>
            <Head title="Categirua" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Categorias</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexcategoria.layout = {
    breadcrumbs: [
        {
            title: 'Categoria',
            href: categoria.index(),
        },
    ],
};