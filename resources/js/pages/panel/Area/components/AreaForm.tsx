import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { storeAreaSchema, StoreAreaSchema } from '../schemas/areaSchema';
import { Area } from '../types/area';
import { User } from '../types/area';

interface AreaFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: StoreAreaSchema) => Promise<void>;
    area?: Area | null;
    users: User[];
    isLoading?: boolean;
}

export function AreaForm({
    open,
    onClose,
    onSubmit,
    area,
    users,
    isLoading = false,
}: AreaFormProps) {
    const isEditing = !!area;

    const form = useForm<StoreAreaSchema>({
        resolver: zodResolver(storeAreaSchema),
        defaultValues: {
            nombre: '',
            user_id: undefined,
        },
    });

    useEffect(() => {
        if (open) {
            if (area) {
                form.reset({ nombre: area.nombre, user_id: area.user_id });
            } else {
                form.reset({ nombre: '', user_id: undefined });
            }
        }
    }, [open, area]);

    const handleSubmit = async (data: StoreAreaSchema) => {
        await onSubmit(data);
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? 'Editar área' : 'Nueva área'}
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nombre del área"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="user_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Responsable</FormLabel>
                                    <Select
                                        value={field.value?.toString() ?? ''}
                                        onValueChange={(v) =>
                                            field.onChange(Number(v))
                                        }
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar usuario" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {users.map((u) => (
                                                <SelectItem
                                                    key={u.id}
                                                    value={u.id.toString()}
                                                >
                                                    {u.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                disabled={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading
                                    ? 'Guardando...'
                                    : isEditing
                                      ? 'Actualizar'
                                      : 'Crear'}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}