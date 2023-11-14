"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import NewGadget from '@/components/ux/gadgets/NewGadget'
import ManageGadget from '@/components/ux/gadgets/ManageGadget';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";


const GadgetsContainer = ({ gadgets, schedules, projectInfo }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGadgets, setFilteredGadgets] = useState(gadgets);
    const [modal, setModal] = useState(false);
    const [gadgetEdited, setGadgetEdited] = useState({});

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = gadgets.filter((gadget) =>
                gadget.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredGadgets(filtered);
        }, 500);
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchQuery, gadgets]);


    gadgets.sort((a, b) => a.id - b.id);


    return (
        <>
            <NewGadget
                modal={modal}
                setModal={setModal}
                schedules={schedules}
            />
            <div className='flex justify-end px-8 py-4 col-span-full row-start-2 row-end-3 '>
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
            <div className=' h-1/2 max-h-72 overflow-y-scroll border-2 rounded-md border-gray-200 p-2 scrollbar min-w-max'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead>Assigned To</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredGadgets ?
                            filteredGadgets.map(gadget => (
                                <TableRow key={gadget.id}>
                                    <TableCell>{gadget.id}</TableCell>
                                    <TableCell>{gadget.name}</TableCell>
                                    <TableCell>{gadget.type}</TableCell>
                                    <TableCell>{gadget.state}</TableCell>
                                    <TableCell className="capitalize">
                                        {!gadget.schedule_id ? "Unassigned" : (() => {
                                            const assignedProjects = [];

                                            projectInfo.forEach(project => {
                                                if (project.schedule_id) {
                                                    project.schedule_id.forEach(task => {
                                                        if (task.id === gadget.schedule_id) {
                                                            assignedProjects.push(project.name);
                                                        }
                                                    });
                                                }
                                            });

                                            return assignedProjects.length > 0 ? assignedProjects[0] : "Unassigned";
                                        })()}
                                    </TableCell>
                                    <TableCell>
                                        <ManageGadget
                                            schedules={schedules}
                                            gadgets={gadgets}
                                            gadget={gadget}
                                            gadgetEdited={gadgetEdited}
                                            setGadgetEdited={setGadgetEdited}
                                            projectInfo={projectInfo}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                            ) : (
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
        </>

    )
}

export default GadgetsContainer;