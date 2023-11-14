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
import ManageEquipmentGadget from "./ManageEquipmentGadget";

const EquipmentContainer = ({ gadgets, schedules }) => {


    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGadgets, setFilteredGadgets] = useState(gadgets);



    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = gadgets?.filter((gadget) =>
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
        <section className='flex flex-col gap-3 row-4-full mt-8 p-3 bg-gray-100 col-span-full w-full min-w-full rounded-sm'>
            <h2>Equipment</h2>
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
                            <TableHead>Type</TableHead>
                            <TableHead>State</TableHead>
                            <TableHead className="w-1/5">Assigned To</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredGadgets?.length > 0 && filteredGadgets ?
                            filteredGadgets.map(gadget => (
                                <TableRow key={gadget.id}>
                                    <TableCell>{gadget.id}</TableCell>
                                    <TableCell>{gadget.name}</TableCell>
                                    <TableCell>{gadget.type}</TableCell>
                                    <TableCell>{gadget.state}</TableCell>
                                    <TableCell className="w-1/4">
                                        {
                                            !gadget.schedule_id ?
                                                "Unasigned"
                                                :
                                                <ManageEquipmentGadget
                                                    schedules={schedules}
                                                    gadget={gadget}
                                                />
                                        }
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>No gadgets found</TableCell>
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

export default EquipmentContainer;
