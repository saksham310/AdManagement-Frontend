import {useEffect} from "react";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import {useNavigate} from "react-router-dom";
import type {AuthUser} from "@/interfaces/user.interface.ts";
import AdvertiserDashboard  from "@/pages/AdvertiserDashboard.tsx";
import AdminDashboard from "@/pages/AdminDashboard.tsx";

const DashboardWrapper = () => {
    const auth = useAuthUser<AuthUser>()
    const navigate = useNavigate();
    useEffect(() => {
        console.log(auth)
    }, [auth]);

    if (!auth) navigate('/login');

    if (auth.role != 'admin') {
        return <AdvertiserDashboard group={auth.group}/>
    } else {
        return <AdminDashboard user={auth}/>
    }


}
export default DashboardWrapper;