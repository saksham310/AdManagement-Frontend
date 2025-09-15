import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import AuthProvider from "react-auth-kit";
import ReactRouterPlugin from '@auth-kit/react-router/route'
import {store} from "@/store/auth.store.ts";
import RequireAuth from "@/components/custom/RequireAuth.tsx";


import LoginPage from "@/pages/LoginPage.tsx";
import DashboardWrapper from "@/pages/DashboardWrapper.tsx";


function App() {
    return (
        <AuthProvider
            store={store}
            router={ReactRouterPlugin}
            fallbackPath="/login"
        >
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <DashboardWrapper/>
                            </RequireAuth>
                        }
                    />

                    <Route path="*" element={<Navigate to="/login" replace/>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
