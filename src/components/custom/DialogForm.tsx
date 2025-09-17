import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";


interface DialogFormProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    children: React.ReactNode,
    title: string,

}

const DialogForm = ({open, title, setOpen, children}: DialogFormProps) => {
    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
}

export default DialogForm;