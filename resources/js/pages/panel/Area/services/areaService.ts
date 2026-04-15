import axios from 'axios';
import { Area, AreaFilters, AreaPaginated } from '@/pages/panel/Area/types/area';
import { StoreAreaSchema, UpdateAreaSchema } from '@/pages/panel/Area/schemas/areaSchema';

const BASE = '/area';

export const areaService = {
    index(filters: AreaFilters = {}): Promise<AreaPaginated> {
        return axios
            .get<AreaPaginated>(BASE, { params: filters })
            .then((r) => r.data);
    },

    show(id: number): Promise<{ data: Area }> {
        return axios.get<{ data: Area }>(`${BASE}/${id}`).then((r) => r.data);
    },

    store(payload: StoreAreaSchema): Promise<{ data: Area }> {
        return axios.post<{ data: Area }>(BASE, payload).then((r) => r.data);
    },

    update(id: number, payload: UpdateAreaSchema): Promise<{ data: Area }> {
        return axios
            .put<{ data: Area }>(`${BASE}/${id}`, payload)
            .then((r) => r.data);
    },

    destroy(id: number): Promise<{ message: string }> {
        return axios
            .delete<{ message: string }>(`${BASE}/${id}`)
            .then((r) => r.data);
    },

    restore(id: number): Promise<{ data: Area }> {
        return axios
            .post<{ data: Area }>(`${BASE}/${id}/restore`)
            .then((r) => r.data);
    },
};