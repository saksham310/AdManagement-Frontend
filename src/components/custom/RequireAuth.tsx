import React from "react";
import {Navigate} from "react-router-dom";
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'

interface RequireAuthProps {
    children: React.ReactNode;
    loginPath?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({
                                                     children,
                                                     loginPath = "/login",
                                                 }) => {
    const isAuthenticated = useIsAuthenticated(); // check auth state

    if (!isAuthenticated) {
        return <Navigate to={loginPath} replace/>;
    }

    return <>{children}</>;
};

export default RequireAuth;
