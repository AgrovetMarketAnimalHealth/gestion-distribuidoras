import { Head } from '@inertiajs/react';
import veterinaria from '@/routes/veterinaria';

export default function Indexveterinaria() {
    return (
        <>
            <Head title="Veterinaria" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Veterinarias</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexveterinaria.layout = {
    breadcrumbs: [
        {
            title: 'Veterinaria',
            href: veterinaria.index(),
        },
    ],
};