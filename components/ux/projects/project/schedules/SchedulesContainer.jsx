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
import ScheduleGadgets from "./ScheduleGadgets";
import { formatearFecha } from "@/lib/utils";

const SchedulesContainer = ({ employees, schedules }) => {


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSchedules, setFilteredSchedules] = useState(schedules);

    const matchEmployeeName = (employeesData, schedule) => {
        const matching = employeesData?.find(employeeData => employeeData.id === schedule);
        return matching ? matching?.name : "Unassigned";
    }

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = schedules?.filter((task) =>
                task.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSchedules(filtered);
        }, 500);
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchQuery, schedules]);



    schedules.sort((a, b) => a.id - b.id);

    return (
        <section className='flex flex-col gap-3 row-4-full mt-8 p-3 bg-gray-100 col-span-full w-full min-w-full rounded-sm'>
            <h2>Schedules</h2>
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
                            <TableHead>Description</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Finish Date Estimated</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Assigned To</TableHead>
                            <TableHead>Gadgets Assigned</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredSchedules?.length > 0 && filteredSchedules ?
                            filteredSchedules.map(schedule => (
                                <TableRow key={schedule.id}>
                                    <TableCell>{schedule.id}</TableCell>
                                    <TableCell>{schedule.name}</TableCell>
                                    <TableCell>{schedule.description}</TableCell>
                                    <TableCell>{formatearFecha(schedule.start_date)}</TableCell>
                                    <TableCell>{formatearFecha(schedule.finish_date)}</TableCell>
                                    <TableCell>{schedule.priority}</TableCell>
                                    <TableCell>{matchEmployeeName(employees, schedule.id)}</TableCell>
                                    <TableCell>
                                        <ScheduleGadgets
                                            schedule={schedule}
                                        />
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>No schedules found</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </section>
    )
}

export default SchedulesContainer;