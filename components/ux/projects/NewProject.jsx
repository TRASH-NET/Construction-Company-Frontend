"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateProject from './CreateProject';



const NewProject = ({ modal, setModal, clients }) => {


    const handleNewEmployee = () => {
        setModal(true)
    }

    return (

        <div className='flex justify-between items-center col-span-full'>
            <h2>Projects</h2>
            <div className='flex items-center justify-end pr-6 my-4 gap-3'>
                <p className=' text-xs'>New Project</p>
                <div
                    className='flex justify-center items-center bg-indigo-600 rounded-full w-8 h-8 hover:cursor-pointer '
                    onClick={handleNewEmployee}
                >
                    <FontAwesomeIcon
                        icon={faPlus}
                        style={{ color: "#FFF", }}
                    />
                </div>

                {modal && <CreateProject
                    setModal={setModal}
                    modal={modal}
                    clients={clients}
                />
                }
            </div>
        </div>

    )
}



export default NewProject