"use client"

import * as React from "react"
import { toast } from "sonner"

import { popService } from "./services/pop.service"
import type { Pop, PopFilters } from "../Pops/types/pop.types"
import { PopTable } from "../Pops/components/PopTable"
import { CreatePopDialog } from "../Pops/components/CreatePopDialog"

export default function IndexPop() {
  const [pops, setPops] = React.useState<Pop[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [filters] = React.useState<PopFilters>({ per_page: 100 })

  async function fetchPops() {
    setIsLoading(true)
    try {
      const result = await popService.index(filters)
      setPops(result.data)
    } catch {
      toast.error("Error al cargar los pops.")
    } finally {
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    fetchPops()
  }, [])

  function handleCreated(pop: Pop) {
    setPops((prev) => [pop, ...prev])
  }

  return (
    <div className="flex flex-col gap-6 py-4 md:gap-8 md:py-6">
      {/* Header */}
      <div className="flex items-center justify-between px-4 lg:px-6">
        <div>
          <h1 className="text-xl font-semibold">Pops</h1>
          <p className="text-sm text-muted-foreground">
            Administra los pops del sistema.
          </p>
        </div>
        <CreatePopDialog onCreated={handleCreated} />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex h-48 items-center justify-center text-muted-foreground text-sm px-4 lg:px-6">
          Cargando...
        </div>
      ) : (
        <PopTable data={pops} onDataChange={setPops} />
      )}
    </div>
  )
}