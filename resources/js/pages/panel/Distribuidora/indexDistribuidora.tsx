import { Head } from '@inertiajs/react';
import distribuidora from '@/routes/distribuidora';

export default function Indexdistribuidora() {
    return (
        <>
            <Head title="Distribuidoras" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Distribuidoras</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexdistribuidora.layout = {
    breadcrumbs: [
        {
            title: 'Distribuidoras',
            href: distribuidora.index(),
        },
    ],
};