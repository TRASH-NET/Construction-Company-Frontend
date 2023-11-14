"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { deleteclient } from "@/models/clients";
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
import EditClient from './EditClient';


const Manageclient = ({ client, clientEdited, setClientEdited }) => {

    const [modal2, setModal2] = useState(false);

    const editclient = () => {
        setModal2(true);
        setClientEdited(client);
    }


    const delete_client = async () => {

        try {
            await deleteclient(client.id);
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
        location.reload();
    }

    return (
        <>
            <div className='flex justify-between'>
                <FontAwesomeIcon
                    icon={faPen}
                    className='cursor-pointer'
                    onClick={editclient}
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
                                This action cannot be undone. This will permanently delete your client
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={delete_client}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            {modal2 && <EditClient
                setModal2={setModal2}
                modal2={modal2}
                clientEdited={clientEdited}
                setClientEdited={setClientEdited}
                client={client}
            />
            }

        </>





    )
}

export default Manageclient