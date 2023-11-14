"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ScheduleGadgets = ({ schedule }) => {

    const { gadgets } = schedule;

    return (
        <>
            {gadgets.length > 0 ?
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex justify-around items-center gap-1 hover:cursor-pointer outline-none rounded-sm p-1 bg-gray-200"><p className="">Gadgets</p><FontAwesomeIcon icon={faAngleDown} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" absolute max-h-64 overflow-y-scroll scrollbar">
                        <DropdownMenuLabel className="text-center">Gadgets</DropdownMenuLabel>
                        <DropdownMenuSeparator className="w-full" />
                        {gadgets.map((gadget) => (
                            <DropdownMenuItem key={gadget.id} className="flex justify-between items-center w-max gap-4"><p>{gadget.name}</p><span className="font-bold">ID: {gadget.id}</span></DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                :
                <div className="flex justify-between items-center gap-2 bg-green-500 rounded-sm py-1 px-3 w-fit">
                    <p className="font-bold text-center">No Gadgets </p>
                    <FontAwesomeIcon icon={faCircleCheck} />
                </div>
            }

        </>
    )
}

export default ScheduleGadgets