import {useState} from "react";
import {useChangePassword} from "@/hooks/useChangePassword.ts";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import type {AuthUser} from "@/interfaces/user.interface.ts";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

const ChangePasswordPage = () => {
    const user = useAuthUser<AuthUser>();
    const authData = useAuthHeader();
    const signIn = useSignIn();
    const navigate = useNavigate();
    const {mutate, isPending} = useChangePassword();
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const [type, token] = authData.split(' ');
        console.log('email', user?.email);
        mutate(
            {email: user?.email || "", newPassword: password},
            {
                onSuccess: () => {

                    signIn({
                        auth: {
                            token: token,
                            type: type,
                        },
                        userState: {
                            ...user,
                            isNew: false
                        }
                    });

                    navigate("/dashboard");
                }
            }
        );
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Set a New Password</h2>
                <p className="text-gray-600 mb-6">
                    For security reasons, you are required to set a new password on your first login.
                    Please choose a strong password that you can remember.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>New Password</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your new password"
                            required
                            className="mt-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="bg-accent hover:bg-green-700 cursor-pointer text-white font-medium"
                        >
                            {isPending ? "Saving..." : "Save Password"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
