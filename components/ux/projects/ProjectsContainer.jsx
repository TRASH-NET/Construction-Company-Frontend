"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import ManageGadget from '@/components/ux/gadgets/ManageGadget';
import { useState } from "react";
import NewProject from "./NewProject";
import { formatearCantidad } from "@/lib/utils";

const ProjectsContainer = ({ projects, payrolls, equipments, clients, schedules }) => {


    const [modal, setModal] = useState(false);
    // const [gadgetEdited, setGadgetEdited] = useState({});
    projects.sort((a, b) => a.id - b.id);

    const getRelatedName = (items, fieldId, fieldName, defaultValue = 'N/A') => {
        const item = items.find(item => item.id === fieldId);
        return item ? item[fieldName] : defaultValue;
    };

    const projectsWithRelatedNames = projects.map(project => ({
        ...project,
        payroll_id: getRelatedName(payrolls, project.payroll_id, 'name'),
        equipment_id: getRelatedName(equipments, project.equipment_id, 'name'),
        client_id: getRelatedName(clients, project.client_id, 'name'),
        schedule_id: getRelatedName(schedules, project.schedule_id, 'state'),
    }));

    return (
        <>
            <NewProject
                modal={modal}
                setModal={setModal}
                payrolls={payrolls}
            />
            <div className=' h-1/2 max-h-72 overflow-y-scroll border-2 rounded-md border-gray-200 p-2 scrollbar min-w-max'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Payroll</TableHead>
                            <TableHead>Equipment</TableHead>
                            <TableHead>Client</TableHead>
                            <TableHead>Schedule</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            projectsWithRelatedNames.map(project => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.id}</TableCell>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell suppressHydrationWarning>{formatearCantidad(project.budget)}</TableCell>
                                    <TableCell>{project.payroll_id}</TableCell>
                                    <TableCell>{project.equipment_id}</TableCell>
                                    <TableCell>{project.client_id}</TableCell>
                                    <TableCell>{project.schedule_id}</TableCell>
                                    <TableCell>
                                        {/* <ManageGadget
                                            gadget={gadget}
                                            setModal={setModal}
                                            gadgetEdited={gadgetEdited}
                                            setGadgetEdited={setGadgetEdited}
                                        /> */}
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

export default ProjectsContainer;