"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateProject from './CreateProject';


const NewProject = ({ modal, setModal, payrolls }) => {


    const handleNewProject = () => {
        setModal(true)
    }

    return (
        <div className='flex items-center justify-end pr-6 my-4 gap-3'>
            <p className=' text-xs'>Create Project</p>
            <div
                className='flex justify-center items-center bg-indigo-600 rounded-full w-8 h-8 hover:cursor-pointer '
                onClick={handleNewProject}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#FFF", }}

                />
            </div>

            {modal && <CreateProject
                setModal={setModal}
                modal={modal}
                payrolls={payrolls}
            />
            }

        </div>
    )
}



export default NewProject;