import {useMutation} from "@tanstack/react-query";
import api from "@/service/api.service.ts";
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import {toast} from 'sonner';
import {useNavigate} from "react-router-dom";

interface LoginPayload {
    email: string;
    password: string;
}

export const useLogin = () => {
    const signIn = useSignIn();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({email, password}: LoginPayload) => {
            const response = await api.post("/auth/login", {email, password});
            return response.data;
        },
        onError: (error) => {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "Something went wrong"
            toast.error(msg, {
                id: "Invalid",
                style: {
                    background: "var(--destructive)",
                    color: "var(--destructive-foreground)"
                }
            });

        },
        onSuccess: (data: any) => {
            // Store access token & user in React Auth Kit
            const {accessToken, user} = data;

            signIn({
                auth: {
                    token: accessToken,
                    type: 'Bearer'
                },
                userState: user,
            });

            toast.success("Logged in successfully!");
            navigate("/dashboard");

        },
    })
};
