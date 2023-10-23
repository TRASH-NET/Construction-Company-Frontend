"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { deleteEmployee } from "@/models/employees";
import EditEmployee from './EditEmployee';
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


const ManageEmployee = ({ employee, employeeEdited, setEmployeeEdited }) => {

    const [modal2, setModal2] = useState(false);

    const editEmployee = () => {
        setModal2(true);
        setEmployeeEdited(employee);
    }


    const delete_employee = async () => {

        try {
            const deleted = await deleteEmployee(employee.id);
        } catch (error) {
            console.error('Error al editar el empleado:', error);
        }
        location.reload();
    }

    return (
        <>
            <div className='flex justify-between'>
                <FontAwesomeIcon
                    icon={faPen}
                    className='cursor-pointer'
                    onClick={editEmployee}
                />
                <AlertDialog>
                    <AlertDialogTrigger><FontAwesomeIcon
                        icon={faTrash}
                        className='cursor-pointer'
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
                            <AlertDialogAction onClick={delete_employee}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </div>
            {modal2 && <EditEmployee
                setModal2={setModal2}
                modal2={modal2}
                employeeEdited={employeeEdited}
                setEmployeeEdited={setEmployeeEdited}
                employee={employee}
            />
            }

        </>





    )
}

export default ManageEmployee