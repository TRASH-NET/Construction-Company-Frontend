"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateGadget from './CreateGadget';


const NewGadget = ({ modal, setModal, schedules }) => {


    const handleNewGadget = () => {
        setModal(true)
    }

    return (
        <div className='flex items-center justify-end pr-6 my-4 gap-3'>
            <p className=' text-xs'>Add Gadget</p>
            <div
                className='flex justify-center items-center bg-indigo-600 rounded-full w-8 h-8 hover:cursor-pointer '
                onClick={handleNewGadget}
            >
                <FontAwesomeIcon
                    icon={faPlus}
                    style={{ color: "#FFF", }}

                />
            </div>

            {modal && <CreateGadget
                setModal={setModal}
                modal={modal}
                schedules={schedules}
            />
            }

        </div>
    )
}



export default NewGadget;