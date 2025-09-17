import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "@/service/api.service.ts";
import {toast} from "sonner";
import type {AdminAdRecord} from "@/components/custom/AdminAdForm.tsx";

export const useUpdateAds = (id: string,) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: AdminAdRecord) => {
            const res = await api.patch(`/ads/${id}`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Ad created successfully!", {
                id: "update-ad",
                style: {
                    background: "var(--accent)",
                    color: "var(--accent-foreground)"
                }
            });
            queryClient.invalidateQueries({queryKey: ["ads"]});
        }
    })
}