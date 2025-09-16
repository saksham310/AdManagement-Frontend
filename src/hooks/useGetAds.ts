import {useQuery} from "@tanstack/react-query";
import api from "@/service/api.service.ts";

export const useGetAds = () => {
    return useQuery({
        queryKey: ['ads'],
        queryFn: async () => {
            const res = await api.get('/ads/group');
            return res.data;
        }
    });
}