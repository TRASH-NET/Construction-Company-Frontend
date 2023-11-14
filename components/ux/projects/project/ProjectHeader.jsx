'use client'

import { faArrowLeft, faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import EditProject from './EditProject';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';


const ProjectHeader = ({ project, clients }) => {

    const [modal, setModal] = useState(false);
    const pathname = usePathname();
    const projectRoute = `/projects/${project.id}`;
    const navLinks = [
        {
            name: 'Board',
            href: `/projects/${project.id}/board`,
        },
        {
            name: 'Teamwork',
            href: `/projects/${project.id}/teamwork`,
        },
        {
            name: 'Schedules',
            href: `/projects/${project.id}/schedules`,
        },
        {
            name: 'Equipments',
            href: `/projects/${project.id}/equipments`
        }
    ]

    const editProject = () => {
        setModal(true);
    }



    return (
        <header className='flex flex-col col-span-full row-start-1 row-end-4 min-w-fit'>
            <div className='flex justify-between items-center pr-3'>
                <h2 className={`capitalize hover:text-[#4F46E5] ${pathname === projectRoute ? 'text-[#4F46E5]' : ''}`}><Link href={`/projects/${project.id}`}>{project.name}</Link></h2>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><FontAwesomeIcon icon={faGear}
                            className='cursor-pointer hover:text-[#4F46E5]'
                            onClick={editProject}
                        /></TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Link href={'/projects'} className='flex w-fit text-sm items-center gap-2 mt-5 hover:underline hover:text-[#4F46E5] decoration-[#4F46E5]'>
                <FontAwesomeIcon icon={faArrowLeft} className='mr-2' />Go Projects
            </Link>
            <nav className='flex text-sm gap-2 mt-5 p-2 hover min-w-fit'>
                {
                    navLinks.map(({ name, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className={pathname === href ? 'link__project-active' : 'link__project'}
                        >
                            <p>{name}</p>
                        </Link>
                    ))
                }
            </nav>
            {modal && <EditProject
                setModal={setModal}
                project={project}
                clients={clients}
            />
            }
        </header>
    )
}

export default ProjectHeader