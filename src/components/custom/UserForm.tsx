"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"

interface UserFormProps {
    initialData?: Partial<UserRecord>
    onSubmit: (values: UserRecord) => void
    mode?: "create" | "edit",
    isSubmitting?: boolean;
}

export interface UserRecord {
    name: string
    email: string
    password?: string
    role: "advertiser" | "admin"
    group?: string,
}

const UserForm = ({initialData, onSubmit, mode = "create",isSubmitting}: UserFormProps) => {
    const [formData, setFormData] = useState<UserRecord>({
        name: initialData?.name || "",
        email: initialData?.email || "",
        password: "",
        role: initialData?.role || "advertiser",
        group: initialData?.group || "",
    })

    const handleChange = (key: keyof UserRecord, value: string) => {
        setFormData(prev => ({...prev, [key]: value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Name</Label>
                <Input
                    value={formData.name}
                    onChange={e => handleChange("name", e.target.value)}
                    required
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange("email", e.target.value)}
                    required
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            {mode === "create" && (
                <div>
                    <Label>Password</Label>
                    <Input
                        type="password"
                        value={formData.password}
                        onChange={e => handleChange("password", e.target.value)}
                        required
                        className={'border border-gray-300 mt-2'}
                    />
                </div>
            )}

            <div>
                <Label>Role</Label>
                <Select
                    defaultValue={formData.role}
                    onValueChange={val => handleChange("role", val)}
                >
                    <SelectTrigger  className={'border border-gray-300 mt-2'}>
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="advertiser">Advertiser</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Group</Label>
                <Input
                    value={formData.group}
                    onChange={e => handleChange("group", e.target.value)}
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div className="flex justify-end pt-4 ">
                <Button type="submit" className={'cursor-pointer'}>
                    {isSubmitting ? "Saving..." : mode === "create" ? "Create User" : "Update User"}
                </Button>
            </div>
        </form>
    )
}

export default UserForm
