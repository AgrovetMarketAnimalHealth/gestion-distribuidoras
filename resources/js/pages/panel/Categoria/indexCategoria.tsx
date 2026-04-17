import { Head } from '@inertiajs/react';
import categoria from '@/routes/categoria';
import { CategoriaDataTable } from "./components/CategoriaDataTable"

export default function IndexCategoria() {
  return (
    <>
      <Head title="Categorías" />
      <div className="flex flex-1 flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Categorías</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gestiona las categorías del sistema.
            </p>
          </div>
        </div>
        <CategoriaDataTable />
      </div>
    </>
  )
}
IndexCategoria.layout = {
  breadcrumbs: [
    {
      title: 'Categorías',
      href: categoria.index(),
    },
  ],
};