import axios from "axios";
import {store} from "@/store/auth.store.ts";
import {toast} from "sonner";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // your API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
        const token = store.tokenStore.value.auth?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config;
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            toast.error("Session expired. Please log in again.", {
                style: {
                    background: "var(--destructive)",
                    color: "var(--destructive-foreground)",
                },
            });

            store.tokenStore.set({auth: null, refresh: null});

            // Redirect to login
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);


export default api;