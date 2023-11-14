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
import { useEffect, useState } from "react";
import ActivitiesEmployee from "./ActivitiesEmployee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const EmployeesContainer = ({ employees }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [modal, setModal] = useState(false);
    const [employeeEdited, setEmployeeEdited] = useState({});

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = employees.filter((employee) =>
                employee.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredEmployees(filtered);
        }, 500);
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchQuery, employees]);

    employees.sort((a, b) => a.id - b.id);

    return (
        <>
            <NewEmployee
                modal={modal}
                setModal={setModal}
            />
            <div className='flex justify-end px-8 py-4 col-span-full row-start-2 row-end-3 '>
                <div className='text-sm'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#A3A3A3' }} className='mx-2' />
                    <input
                        type="text"
                        placeholder="Search Project "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='outline-none rounded-sm bg-[#E7E5E4] placeholder:text-gray-800 p-2 text-gray-700'
                    ></input>
                </div>
            </div>
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
                            <TableHead>Schedules</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEmployees.length > 0 ?
                            filteredEmployees.map(employee => (

                                <TableRow key={employee.id}>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.name}</TableCell>
                                    <TableCell>{employee.last_name}</TableCell>
                                    <TableCell>{employee.phone}</TableCell>
                                    <TableCell>{employee.mail}</TableCell>
                                    <TableCell>{employee.type}</TableCell>
                                    <TableCell>
                                        <ActivitiesEmployee
                                            employee={employee}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <ManageEmployee
                                            employee={employee}
                                            setModal={setModal}
                                            employeeEdited={employeeEdited}
                                            setEmployeeEdited={setEmployeeEdited}
                                        />
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell>No match results</TableCell>
                                    <TableCell>No match results</TableCell>
                                    <TableCell>No match results</TableCell>
                                    <TableCell>No match results</TableCell>
                                    <TableCell>No match results</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div >

        </>

    )
}

export default EmployeesContainer