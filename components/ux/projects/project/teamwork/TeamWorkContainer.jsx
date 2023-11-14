"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import ActivitiesEmployee from "@/components/ux/employees/ActivitiesEmployee";


const TeamWorkContainer = ({ employees }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState(employees);


    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = employees?.filter((employee) =>
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
        <section className='flex flex-col gap-3 row-4-full mt-8 p-3 bg-gray-100 col-span-full w-full min-w-full rounded-sm'>
            <h2>Teamwork</h2>
            <div className='flex justify-end px-2 col-span-full row-start-2 row-end-3'>
                <div className='text-sm'>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#A3A3A3' }} className='mx-2' />
                    <input
                        type="text"
                        placeholder="Search Gadget"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='outline-none rounded-sm bg-[#E7E5E4] placeholder:text-gray-800 p-2 text-gray-700'
                    ></input>
                </div>
            </div>
            <div className=' h-full overflow-y-scroll border-2 rounded-md border-gray-200 p-2 scrollbar min-w-max bg-white'>
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
            </div>
        </section>
    )
}

export default TeamWorkContainer;