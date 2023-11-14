'use client'

import { faHashtag, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BoardCardContainer from './BoardCardContainer'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import CreateTask from './CreateTask'

const BoardContainer = ({ project, employees }) => {

    const [modalCreate, setModalCreate] = useState(false);

    const schedules = project.schedule_id;
    const newActivities = schedules.filter(schedule => schedule.state === 'new');
    const inProgressActivities = schedules.filter(schedule => schedule.state === 'in progress');
    const inReviewActivities = schedules.filter(schedule => schedule.state === 'in review');
    const doneActivities = schedules.filter(schedule => schedule.state === 'done');

    const handleNewSchedule = () => {
        setModalCreate(true);
    }

    return (
        <section className='flex flex-col gap-3 row-4-full mt-8 p-3 bg-gray-100 col-span-full w-full min-w-full rounded-sm'>
            <h2 className='pl-3'>Board</h2>
            <div className='grid-board px-3 h-full gp'>
                <div className='flex justify-start col-span-full row-start-1 row-end-2'>
                    <div className='flex justify-between items-center text-sm font-semibold bg-white w-1/4 h-fit py-2 px-6 border-r border-b-2'>
                        <h4>New</h4>
                        <span><FontAwesomeIcon icon={faHashtag} /> {newActivities.length}</span>
                    </div>
                    <div className='flex justify-between items-center text-sm font-semibold bg-white w-1/4 h-fit py-2 px-6 border-r border-b-2'>
                        <h4>In Progress</h4>
                        <span><FontAwesomeIcon icon={faHashtag} /> {inProgressActivities.length}</span>
                    </div>
                    <div className='flex justify-between items-center text-sm font-semibold bg-white w-1/4 h-fit py-2 px-6 border-r border-b-2'>
                        <h4>In Review</h4>
                        <span><FontAwesomeIcon icon={faHashtag} /> {inReviewActivities.length}</span>
                    </div>
                    <div className='flex justify-between items-center text-sm font-semibold bg-white w-1/4 h-fit py-2 px-6 border-b-2'>
                        <h4>Done</h4>
                        <span><FontAwesomeIcon icon={faHashtag} /> {doneActivities.length}</span>
                    </div>
                </div>
                <div className=' row-start-2 row-end-6 bg-white col-span-full'>
                    <div className='flex justify-start col-span-full row-start-1 row-end-2 h-full'>
                        <div className='flex flex-col gap-1 items-center text-sm font-semibold bg-gray-200 shadow-item w-1/4 h-full py-2 px-3 border-r border-white'>
                            <div className='flex items-center justify-start gap-2 w-full pl-1'>
                                <Button onClick={handleNewSchedule} variant="newTask" size="newTask"><FontAwesomeIcon icon={faPlus} /> New Task</Button>
                            </div>

                            {newActivities.map(schedule => (
                                <BoardCardContainer
                                    key={schedule.id}
                                    schedule={schedule}
                                    employees={employees}

                                />
                            ))}
                        </div>
                        <div className='flex flex-col gap-1 items-center text-sm font-semibold bg-gray-200 shadow-item w-1/4 h-full py-2 px-3 border-r border-white'>
                            {inProgressActivities.map(schedule => (
                                <BoardCardContainer
                                    key={schedule.id}
                                    schedule={schedule}
                                    employees={employees}

                                />
                            ))}
                        </div>
                        <div className='flex flex-col gap-1 items-center text-sm font-semibold bg-gray-200 shadow-item w-1/4 h-full py-2 px-3 border-r border-white'>
                            {inReviewActivities.map(schedule => (
                                <BoardCardContainer
                                    key={schedule.id}
                                    schedule={schedule}
                                    employees={employees}

                                />
                            ))}
                        </div>
                        <div className='flex flex-col gap-1 items-center text-sm font-semibold bg-gray-200 shadow-item w-1/4 h-full py-2 px-3 border-r border-white'>
                            {doneActivities.map(schedule => (
                                <BoardCardContainer
                                    key={schedule.id}
                                    schedule={schedule}
                                    employees={employees}

                                />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            {modalCreate && <CreateTask
                project={project}
                employees={employees}
                setModalCreate={setModalCreate}
            />}
        </section>
    )
}

export default BoardContainer