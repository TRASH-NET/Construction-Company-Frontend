"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import NewClient from '@/components/ux/clients/NewClient';
import ManageClient from '@/components/ux/clients/ManageClient';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ClientsContainer = ({ clients }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredClient, setFilteredClient] = useState(clients);
    const [modal, setModal] = useState(false);
    const [clientEdited, setClientEdited] = useState({});

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = clients.filter((client) =>
                client.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredClient(filtered);
        }, 500);
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchQuery, clients]);

    clients.sort((a, b) => a.id - b.id);

    return (
        <>
            <NewClient
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredClient.length > 0 ?
                            filteredClient.map(client => (

                                <TableRow key={client.id}>
                                    <TableCell>{client.id}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.last_name}</TableCell>
                                    <TableCell>{client.phone}</TableCell>
                                    <TableCell>{client.mail}</TableCell>
                                    <TableCell>
                                        <ManageClient
                                            client={client}
                                            setModal={setModal}
                                            clientEdited={clientEdited}
                                            setClientEdited={setClientEdited}
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

export default ClientsContainer