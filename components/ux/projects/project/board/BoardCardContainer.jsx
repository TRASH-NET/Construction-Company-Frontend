'use client'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faClipboard, faToolbox, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { calcularDiasrestantes, formatearFecha } from "@/lib/utils";
import EditTask from "./EditTask";

const BoardCardContainer = ({ schedule, employees }) => {

    const [modalEdit, setModalEdit] = useState(false);

    const matchEmployeeName = (employeesData, schedule) => {
        const matching = employeesData?.find(employeeData => employeeData.id === schedule);
        return matching ? matching?.name : "Unassigned";
    }

    const getColorStatus = (state) => {
        switch (state) {
            case 'new':
                return 'text-gray-300';
            case 'in progress':
                return 'text-blue-500';
            case 'in review':
                return 'text-yellow-500';
            case 'done':
                return 'text-green-500';
            default:
                return '';
        }
    };
    const getColorPriority = (prioridad) => {
        switch (prioridad) {
            case 1:
                return 'text-[#EF4444]';
            case 2:
                return 'text-[#FBBF24]';
            case 3:
                return 'text-[#2563EB]';
            default:
                return 'text-gray-300';
        }
    };

    const getPriority = (priority) => {
        switch (priority) {
            case 1:
                return 'High';
            case 2:
                return 'Medium';
            case 3:
                return 'Low';
            default:
                return 'Unknown';
        }
    };

    const circleColor = getColorStatus(schedule.state);
    const priorityColor = getColorPriority(schedule.priority);

    const handleClickEdit = () => {
        setModalEdit(true);
    };


    return (
        <>
            <Card onClick={handleClickEdit} className="w-full hover:cursor-pointer hover:shadow-md card-board">
                <CardHeader >
                    <CardTitle className="text-sm capitalize mb-2"><FontAwesomeIcon icon={faClipboard} style={{ color: "#5EEAD4" }} /> {schedule.name}</CardTitle>
                    <CardDescription className="capitalize flex items-center gap-1 text-xs"><FontAwesomeIcon icon={faCircle} className={`${circleColor} text-[8px]`} /> {schedule.state}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    <p className="flex items-center gap-1 capitalize text-xs italic"><FontAwesomeIcon icon={faUser} />{matchEmployeeName(employees, schedule.employee_id)}</p>
                    <p className="flex items-center gap-1 capitalize text-xs italic"><FontAwesomeIcon icon={faToolbox} />{schedule.gadgets.length}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs">
                    <p>Time left: {calcularDiasrestantes(formatearFecha(schedule.finish_date))}</p>
                    <p>Priority: <span className={`${priorityColor}`}>{getPriority(schedule.priority)}</span></p>
                </CardFooter>
            </Card>
            {modalEdit &&
                <EditTask
                    schedule={schedule}
                    employees={employees}
                    setModalEdit={setModalEdit}
                />}
        </>

    )
}

export default BoardCardContainer