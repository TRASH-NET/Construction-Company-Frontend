"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter
} from "@/components/ui/alert-dialog";


const DeleteProject = ({ delete_Project, project }) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger className="w-full">
                <div className="w-full bg-red-600 uppercase font-bold hover:bg-red-700 text-white h-10 px-4 py-2 rounded-sm text-sm">Delete Project</div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the project "<b>{project.name}</b>" and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={delete_Project}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProject