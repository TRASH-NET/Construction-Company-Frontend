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
import { useState } from "react";

const GadgetsContainer = ({ gadgets }) => {

    const [modal, setModal] = useState(false);
    const [gadgetEdited, setGadgetEdited] = useState({});

    gadgets.sort((a, b) => a.id - b.id);

    return (
        <>
            <NewGadget
                modal={modal}
                setModal={setModal}
            />
            <div className=' h-1/2 overflow-y-scroll border-2 rounded-md border-gray-200 p-2 scrollbar min-w-max'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>State</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            gadgets.map(gadget => (
                                <TableRow key={gadget.id}>
                                    <TableCell>{gadget.id}</TableCell>
                                    <TableCell>{gadget.name}</TableCell>
                                    <TableCell>{gadget.type}</TableCell>
                                    <TableCell>{gadget.state}</TableCell>
                                    <TableCell>
                                        <ManageGadget
                                            gadget={gadget}
                                            setModal={setModal}
                                            gadgetEdited={gadgetEdited}
                                            setGadgetEdited={setGadgetEdited}
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

export default GadgetsContainer;