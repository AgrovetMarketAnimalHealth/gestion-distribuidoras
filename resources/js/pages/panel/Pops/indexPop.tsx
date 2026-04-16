import { Head } from '@inertiajs/react';
import pops from '@/routes/pops';

export default function Indexpops() {
    return (
        <>
            <Head title="Pops" />
            <div className="flex flex-col gap-6 py-6">
                <div className="px-4 lg:px-6">
                    <h1 className="text-xl font-semibold">Pops</h1>
                    <p className="text-sm text-muted-foreground">
                        Se defiran de acuerdo a criterio.
                    </p>
                </div>
            </div>
        </>
    );
}

Indexpops.layout = {
    breadcrumbs: [
        {
            title: 'Pops',
            href: pops.index(),
        },
    ],
};