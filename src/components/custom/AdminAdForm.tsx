
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

export interface AdminAdRecord {
    app: string
    page: string
    placement: string
    status: "active" | "inactive"
    impressionCount?: number
    group: string // advertiser
    bannerUrl?: string
}

interface AdminAdFormProps {
    initialData?: Partial<AdminAdRecord>
    onSubmit: (values: AdminAdRecord) => void
    mode?: "create" | "edit"
    isSubmitting?: boolean
}

const AdminAdForm = ({
                         initialData = {},
                         onSubmit,
                         mode = "create",
                         isSubmitting,
                     }: AdminAdFormProps) => {
    const [form, setForm] = useState<AdminAdRecord>({
        app: initialData.app || "",
        page: initialData.page || "",
        placement: initialData.placement || "",
        status: initialData.status || "inactive",
        impressionCount: initialData.impressionCount || 0,
        group: initialData.group || "",
        bannerUrl: initialData.bannerUrl || "",
    })

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: name === "impressionCount" ? Number(value) : value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="app">App</Label>
                <Input
                    id="app"
                    name="app"
                    value={form.app}
                    onChange={handleChange}
                    required
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div>
                <Label htmlFor="page">Page</Label>
                <Input
                    id="page"
                    name="page"
                    value={form.page}
                    onChange={handleChange}
                    required
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div>
                <Label htmlFor="placement">Placement</Label>
                <Input
                    id="placement"
                    name="placement"
                    value={form.placement}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label>Status</Label>
                <Select
                    value={form.status}
                    onValueChange={val =>
                        setForm(prev => ({ ...prev, status: val as "active" | "inactive" }))
                    }
                >
                    <SelectTrigger  className={'border border-gray-300 mt-2'}>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="impressionCount">Impression Count</Label>
                <Input
                    id="impressionCount"
                    name="impressionCount"
                    type="number"
                    value={form.impressionCount}
                    onChange={handleChange}
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div>
                <Label htmlFor="group">Advertiser</Label>
                <Input
                    id="group"
                    name="group"
                    value={form.group}
                    onChange={handleChange}
                    required
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <div>
                <Label htmlFor="bannerUrl">Banner URL</Label>
                <Input
                    id="bannerUrl"
                    name="bannerUrl"
                    type="url"
                    value={form.bannerUrl}
                    onChange={handleChange}
                    className={'border border-gray-300 mt-2'}
                />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {mode === "create" ? "Create Advertisement" : "Update Advertisement"}
            </Button>
        </form>
    )
}

export default AdminAdForm
