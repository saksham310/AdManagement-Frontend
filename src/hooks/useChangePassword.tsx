import {useMutation} from '@tanstack/react-query';
import api from "@/service/api.service.ts";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: { email: string; newPassword: string }) => {
            const response = await api.patch(`/auth/change-password`, data);
            return response.data;
        }
    });
}

