import { Head } from '@inertiajs/react';
import zona from '@/routes/categoria';

export default function Indexzona() {
    return (
        <>
            <Head title="Zona" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Zonas</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexzona.layout = {
    breadcrumbs: [
        {
            title: 'Zona',
            href: zona.index(),
        },
    ],
};