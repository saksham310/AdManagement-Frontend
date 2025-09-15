import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Eye, EyeOff, Shield} from "lucide-react"
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {useLogin} from "@/hooks/useLogin.ts";


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const {mutate, isPending} = useLogin();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            email: email,
            password: password
        }

        mutate(data)

    }

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                        <Shield className="w-8 h-8 text-primary-foreground"/>
                    </div>
                    <h1 className="text-2xl font-bold text-foreground text-balance">Advertisement Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Sign in to your advertiser account</p>
                </div>

                <Card className="border-border shadow-lg bg-white">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-xl text-center">Welcome back</CardTitle>
                        <CardDescription className="text-center">Enter your credentials to access your
                            dashboard</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="h-11 border border-gray-400"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="h-11 pr-10 border-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                                    </button>
                                </div>
                            </div>


                            <Button type="submit" className="w-full h-11" disabled={isPending}>
                                {isPending ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-muted-foreground">
                            <p>Need access? Contact your administrator</p>
                        </div>
                    </CardContent>
                </Card>

                <div className="mt-8 text-center text-xs text-muted-foreground">
                    <p>© {new Date().getFullYear()} Advertisement Dashboard. All rights reserved.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage