'use client'
import React, { useEffect, useState } from 'react'
import { ProjectCard } from './ProjectCard';
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { formatearCantidad, formatearFecha } from '@/lib/utils';
import { faCircleInfo, faCoins, faMagnifyingGlass, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import NewProject from './NewProject';

const ProjectsContainer = ({ projects, clients }) => {

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            const filtered = projects.filter((project) =>
                project.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProjects(filtered);
        }, 500);
        return () => {
            clearTimeout(delayTimer);
        };
    }, [searchQuery, projects]);

    const handleResetFilter = () => {
        setSearchQuery('');
        setFilteredProjects(projects);
    };

    const getClientName = (clientId) => {
        const client = clients.find(client => client.id === clientId);
        return client ? client.name : 'Without Owner';
    };

    filteredProjects.sort((a, b) => {
        const numA = parseInt(a.name.replace(/\D/g, ''), 10);
        const numB = parseInt(b.name.replace(/\D/g, ''), 10);

        if (numA < numB) {
            return -1;
        } else if (numA > numB) {
            return 1;
        } else {
            // Si los números son iguales, compara las cadenas completas
            return a.name.localeCompare(b.name);
        }
    });


    return (
        <>
            <NewProject
                modal={modal}
                setModal={setModal}
                clients={clients}
            />
            <nav className='flex justify-end px-8 col-span-full row-start-2 row-end-4 mt-3 '>
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
            </nav>
            <div className="flex justify-start flex-wrap col-span-full row-3-full gap-4 w-full mt-5 overflow-scroll scroll-projects">
                {filteredProjects.length > 0 ?
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.id}>
                            <Link href={project.id ? `/projects/${project.id}` : `/projects`}>
                                <CardHeader>
                                    <CardTitle className="mb-2 text-[18px] capitalize">{project.name}</CardTitle>
                                    <CardDescription className="card-description text-sm font-thin text-justify">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat minus porro, atque ipsam inventore modi voluptas non sit laboriosam libero nihil dolores nam? Perspiciatis explicabo eaque iure, eos neque odio impedit dignissimos tenetur aliquam laudantium adipisci reiciendis culpa. Dolores nostrum excepturi reprehenderit, impedit suscipit voluptatibus eum omnis aliquid mollitia debitis.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className=" overflow-hidden">
                                    <p className="text-[12px] font-semibold">
                                        Created <span className='font-bold inline-block'>{formatearFecha(project.start_date)}</span>
                                    </p>
                                    <div className={`flex justify-end items-center gap-5 w-full text-xs`}>
                                        <div className='flex flex-col gap-1'>
                                            <FontAwesomeIcon icon={faUserTie} style={{ color: "#22D3EE" }} className=' text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out' />
                                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out'>{getClientName(project.client_id)}</p>
                                        </div>
                                        <div className='relative flex flex-col gap-1'>
                                            <FontAwesomeIcon icon={faCircleInfo} className='text-2xl absolute top-[-15px] right-[-10px] opacity-1 group-hover:opacity-0 transition-opacity duration-500' style={{ color: "#4F46E5" }} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <FontAwesomeIcon icon={faCoins} style={{ color: "#ffbf00" }} className='text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1200 ease-in-out' />
                                            <p className='opacity-0 group-hover:opacity-100 transition-opacity duration-1200 ease-in-out'>{formatearCantidad(project.budget)}</p>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Link>
                        </ProjectCard>
                    )) : (
                        <div className='flex flex-col m-auto items-center'>
                            <h3>No match found</h3>
                            <Button onClick={handleResetFilter} className="bg-[#F5F5F4] text-gray-800 my-3 hover:bg-[#E7E5E4] transition-all duration-400">Reset filter</Button>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ProjectsContainer;