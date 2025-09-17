export type AdRecord = {
    id: number
    app: string
    page: string
    placement: string
    status: "active" | "inactive"
    impressionCount: number
}
