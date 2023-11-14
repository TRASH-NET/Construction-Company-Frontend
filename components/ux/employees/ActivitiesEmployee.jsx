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

const ActivitiesEmployee = ({ employee }) => {

    const { schedules } = employee;

    return (
        <>
            {employee.schedules.length > 0 ?
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex justify-around items-center gap-1 hover:cursor-pointer outline-none bg-orange-500 rounded-sm p-1"><p className="">To Do</p><FontAwesomeIcon icon={faAngleDown} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className=" absolute max-h-64 overflow-y-scroll scrollbar">
                        <DropdownMenuLabel className="text-center">Tasks</DropdownMenuLabel>
                        <DropdownMenuSeparator className="w-full" />
                        {schedules.map((schedule) => (
                            <DropdownMenuItem key={schedule.id} className="flex justify-between items-center w-max gap-4"><p>{schedule.name}</p><span className="font-bold">ID: {schedule.id}</span></DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                :
                <div className="flex justify-between items-center gap-2 bg-green-500 rounded-sm py-1 px-3 w-fit">
                    <p className="font-bold text-center">Ok </p>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#fafafa", }} />
                </div>
            }

        </>
    )
}

export default ActivitiesEmployee