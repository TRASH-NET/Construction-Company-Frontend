"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteGadget } from '@/models/gadgets';
import EditGadget from './EditGadget';


const ManageGadget = ({ schedules, gadgets, gadget, gadgetEdited, setGadgetEdited, projectInfo }) => {

    const [modal2, setModal2] = useState(false);

    const editGadget = () => {
        setModal2(true);
        setGadgetEdited(gadget);
    }


    const delete_gadget = async () => {

        try {
            await deleteGadget(gadget.id);
            window.location.reload();
        } catch (error) {
            console.error('Error al editar el empleado:', error);
        }
    }

    return (
        <>
            <div className='flex justify-around'>
                <FontAwesomeIcon
                    icon={faPen}
                    className='cursor-pointer'
                    onClick={editGadget}
                />
                <AlertDialog>
                    <AlertDialogTrigger><FontAwesomeIcon
                        icon={faTrash}
                        className='cursor-pointer'
                        style={{ color: '#DC2626' }}
                    /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your employee
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={delete_gadget}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            {modal2 && <EditGadget
                setModal2={setModal2}
                gadgetEdited={gadgetEdited}
                gadget={gadget}
                gadgets={gadgets}
                schedules={schedules}
                projectInfo={projectInfo}
            />
            }

        </>





    )
}

export default ManageGadget