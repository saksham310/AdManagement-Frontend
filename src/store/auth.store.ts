import createAuthStore from "react-auth-kit/store/createAuthStore";

export const store = createAuthStore("cookie", {
    authName: "_auth",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
});