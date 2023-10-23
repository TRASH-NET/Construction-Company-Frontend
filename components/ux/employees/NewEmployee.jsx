"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateEmployee from './CreateEmployee';



const NewEmployee = ({ modal, setModal }) => {


    const handleNewEmployee = () => {
        setModal(true)
    }

    return (
        <div className='flex items-center justify-end pr-6 my-4 gap-3'>
            <p className=' text-xs'>Add Employee</p>
            <div className='flex justify-center items-center bg-indigo-600 rounded-full w-8 h-8 hover:cursor-pointer '>
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#FFF", }}
                    onClick={handleNewEmployee}
                />
            </div>

            {modal && <CreateEmployee
                setModal={setModal}
                modal={modal}
            />
            }
        </div>
    )
}



export default NewEmployee