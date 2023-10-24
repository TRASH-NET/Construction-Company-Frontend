"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import NewEmployee from '@/components/ux/employees/NewEmployee';
import ManageEmployee from '@/components/ux/employees/ManageEmployee';
import { useState } from "react";

const EmployeesContainer = ({ employees }) => {

    const [modal, setModal] = useState(false);
    const [employeeEdited, setEmployeeEdited] = useState({});

    employees.sort((a, b) => a.id - b.id);

    return (
        <>
            <NewEmployee
                modal={modal}
                setModal={setModal}
            />
            <div className=' h-1/2 max-h-72 overflow-y-scroll border-2 rounded-md border-gray-200 p-2 scrollbar min-w-max'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Last Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Mail</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            employees.map(employee => (
                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.last_name}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                    <TableCell>{employee.mail}</TableCell>
                                    <TableCell>{employee.type}</TableCell>
                                    <TableCell>
                                        <ManageEmployee
                                            employee={employee}
                                            setModal={setModal}
                                            employeeEdited={employeeEdited}
                                            setEmployeeEdited={setEmployeeEdited}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>

    )
}

export default EmployeesContainer