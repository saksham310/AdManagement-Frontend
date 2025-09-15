export interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: "admin" | "advertiser";
    group: string | null;
}
