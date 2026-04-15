import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Meta {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
}

interface AreaPaginationProps {
    meta: Meta;
    onPageChange: (page: number) => void;
}

export function AreaPagination({ meta, onPageChange }: AreaPaginationProps) {
    const { current_page, last_page, from, to, total } = meta;

    if (last_page <= 1) return null;

    return (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
                Mostrando {from}–{to} de {total} áreas
            </span>
            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={current_page === 1}
                    onClick={() => onPageChange(current_page - 1)}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm">
                    {current_page} / {last_page}
                </span>
                <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={current_page === last_page}
                    onClick={() => onPageChange(current_page + 1)}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}