import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "@/service/api.service.ts";
import {toast} from "sonner";
import type {AdminAdRecord} from "@/components/custom/AdminAdForm.tsx";

export const useCreateAds = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AdminAdRecord) => {
            const res = await api.post('/ads/new', data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Ad created successfully!", {
                id: "create-ad",
                style: {
                    background: "var(--accent)",
                    color: "var(--accent-foreground)"
                }
            });
            queryClient.invalidateQueries({queryKey: ["ads"]});
        }
    })
}