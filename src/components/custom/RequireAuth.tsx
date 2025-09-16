import React from "react";
import {Navigate} from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import type {AuthUser} from "@/interfaces/user.interface.ts";

interface RequireAuthProps {
    children: React.ReactNode;
    loginPath?: string;
    changePasswordPath?: string;
    allowNewUser?:boolean;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
                                                     children,
                                                     loginPath = "/login",
                                                     changePasswordPath = "/change-password",
                                                     allowNewUser = false,
                                                 }) => {
    const isAuthenticated = useIsAuthenticated(); // check auth state
    const user = useAuthUser<AuthUser>();

    if (!isAuthenticated) {
        return <Navigate to={loginPath} replace/>;
    }
    if (user.isNew && !allowNewUser) {
        return <Navigate to={changePasswordPath} replace/>;
    }

    return <>{children}</>;
};

export default RequireAuth;
