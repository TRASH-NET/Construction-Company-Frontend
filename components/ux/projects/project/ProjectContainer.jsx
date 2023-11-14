"use client"
import { calcularDiasTranscurridos, formatearCantidad, formatearFecha } from '@/lib/utils'
import { faCalendarDays, faClipboard, faClipboardCheck, faClock, faCoins, faUserTie, faUsers } from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ProjectContainer = ({ project, clients }) => {

    const getClientName = (clientId) => {
        const client = clients.find(client => client.id === clientId);
        return client ? client.name : 'Without Owner';
    };
    const totalTasks = project.schedule_id ? project.schedule_id.length : 0;
    const completedTasks = project.schedule_id ? project.schedule_id.filter(task => task.state === 'done' || task.state === 'Done').length : 0;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const employeeIdsSet = new Set();

    if (project.schedule_id) {
        project.schedule_id.forEach(task => {
            if (task.employee_id) {
                employeeIdsSet.add(task.employee_id);
            }
        });
    }

    const uniqueEmployeeCount = employeeIdsSet.size;


    return (
        <section className='flex flex-col gap-3 row-4-full mt-8 p-3 bg-gray-100 col-span-full w-full min-w-full rounded-sm'>
            <div className='flex flex-row query-padre items-start gap-3'>
                <div className=' w-3/5 p-5 bg-white rounded-md shadow-xl min-h-[400px] query'>
                    <h3 className='mb-2'>About this project</h3>
                    <p className=" text-sm font-normal leading-6 text-justify">
                        {project.description}
                    </p>
                </div>
                <div className='w-2/5 p-5 bg-white rounded-md shadow-xl min-h-[400px] query'>
                    <h3 className='mb-6'>Stats Project</h3>
                    <div className='grid grid-cols-2 grid-rows-3'>
                        <div className='flex justify-center gap-6 flex-col col-start-1 col-end-2 row-start-1 row-end-3'>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faCoins} style={{ color: "#ffbf00" }} />
                                <p className='text-sm font-normal'>Budget <span className='font-bold block text-center'>{formatearCantidad(project.budget)}</span></p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faClipboard} style={{ color: "#3B82F6" }} />
                                <p className='text-sm font-normal'>Tasks Created<span className='font-bold block text-center'>{project.schedule_id ? project.schedule_id.length : 0}</span></p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faUserTie} style={{ color: "#22D3EE" }} />
                                <p className='text-sm font-normal'>Project Owner<span className='font-bold block text-center'>{getClientName(project.client_id)}</span></p>
                            </div>
                        </div>
                        <div className='flex justify-center gap-6 flex-col col-2-full row-start-1 row-end-3'>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#dc4c4c", }} />
                                <p className='text-sm font-normal'>Start Date Project <span className='font-bold block text-center'>{formatearFecha(project.start_date)}</span></p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faClipboardCheck} style={{ color: "#5EEAD4" }} />
                                <p className='text-sm font-normal'>Task Completed<span className='font-bold block text-center'>{project.schedule_id ? project.schedule_id.filter(task => task.state === 'done').length : 0} </span></p>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <FontAwesomeIcon icon={faClock} style={{ color: "#78716C" }} />
                                <p className='text-sm font-normal'>Elapsed Time<span className='font-bold block text-center'>{calcularDiasTranscurridos(project.start_date)} Days</span></p>
                            </div>
                        </div>
                        <div className='flex justify-around items-center flex-col col-start-1 col-end-3 row-start-3 row-end-4'>
                            <div className='flex flex-col items-center gap-2'>
                                <CircularProgressbarWithChildren
                                    value={completionPercentage}
                                    className='w-[100px] text-center'
                                    styles={buildStyles({
                                        pathColor: '#DC2626',
                                        trailColor: '#F5F5F5',
                                        textColor: '#3B82F6',
                                        strokeLinecap: "butt"
                                    })}
                                >
                                    <div style={{ fontSize: 16 }}>
                                        <strong>{completionPercentage}%</strong>

                                    </div>
                                </CircularProgressbarWithChildren>
                            </div>
                            <p className='text-sm'>Project progress</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center gap-3 w-2/5 p-5 bg-white rounded-md shadow-xl h-full self-end'>
                <h3>Employees</h3>
                <FontAwesomeIcon icon={faUsers} style={{ color: "#78716C" }} />
                <div className='flex items-center justify-center w-[30px] h-[30px] bg-[#F5F5F4] rounded-full hover:bg-[#D6D3D1]'>
                    <p className='text-sm font-normal'>
                        {uniqueEmployeeCount}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ProjectContainer