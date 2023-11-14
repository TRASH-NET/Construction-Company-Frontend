"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateClient from './CreateClient';



const NewClient = ({ modal, setModal }) => {


    const handleNewClient = () => {
        setModal(true)
    }

    return (
        <div className='flex items-center justify-end pr-6 my-4 gap-3'>
            <p className=' text-xs'>Add Client</p>
            <div
                className='flex justify-center items-center bg-indigo-600 rounded-full w-8 h-8 hover:cursor-pointer '
                onClick={handleNewClient}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#FFF", }}
                />
            </div>

            {modal && <CreateClient
                setModal={setModal}
                modal={modal}
            />
            }
        </div>
    )
}



export default NewClient