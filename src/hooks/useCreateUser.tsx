import {useMutation} from "@tanstack/react-query";
import api from "@/service/api.service.ts";
import type {UserRecord} from "@/components/custom/UserForm.tsx";
import {toast} from "sonner";

export const useCreateUser = () => {

    return useMutation({
        mutationFn: async (data: UserRecord) => {
            const res = await api.post('/user', data);
            return res.data;
        },
        onSuccess:  () => {
            toast.success("User created successfully!", {
                id: "create",
                style: {
                    background: "var(--accent)",
                    color: "var(--accent-foreground)"
                }
            });
        }
    })
}