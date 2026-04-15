import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { AreaFilters as IAreaFilters } from '../types/area';

interface AreaFiltersProps {
    filters: IAreaFilters;
    onChange: (filters: IAreaFilters) => void;
}

export function AreaFiltersBar({ filters, onChange }: AreaFiltersProps) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ ...filters, search: e.target.value, page: 1 });
    };

    const handlePerPage = (value: string) => {
        onChange({ ...filters, per_page: Number(value), page: 1 });
    };

    const handleClear = () => {
        onChange({ search: '', per_page: 15, page: 1 });
    };

    const hasActiveFilters = !!filters.search;

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <Input
                    className="pl-9"
                    placeholder="Buscar área..."
                    value={filters.search ?? ''}
                    onChange={handleSearch}
                />
            </div>

            <div className="flex items-center gap-2">
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="h-9 gap-1 text-muted-foreground"
                    >
                        <X className="h-3.5 w-3.5" />
                        Limpiar
                    </Button>
                )}
                <Select
                    value={String(filters.per_page ?? 15)}
                    onValueChange={handlePerPage}
                >
                    <SelectTrigger className="h-9 w-[110px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 15, 25, 50].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                                {n} por página
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}