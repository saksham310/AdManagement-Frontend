export type AdRecord = {
    id: string
    app: string
    page: string
    placement: string
    status: "active" | "inactive"
    impressionCount: number
}
