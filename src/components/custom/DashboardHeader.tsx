import {Button} from "@/components/ui/button.tsx";
import {LogOut, User} from 'lucide-react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import type {AuthUser} from "@/interfaces/user.interface.ts";

const DashboardHeader = () => {
    const signOut = useSignOut();
    const user = useAuthUser<AuthUser>()

    const onLogout = () => {
        signOut();
        window.location.href = '/login';
    }
    return <>
        <header className="border-b border-border  backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">AD</span>
                        </div>
                        <h2 className="text-lg font-semibold text-foreground">Ad Dashboard</h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4"/>
                            <span>{user.name}</span>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2 bg-transparent" onClick={onLogout}>
                            <LogOut className="h-4 w-4"/>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    </>
}

export default DashboardHeader;