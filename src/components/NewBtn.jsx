import React from 'react'
import { FiPlus } from 'react-icons/fi'

const NewBtn = ({ setShow }) => {
    return (
        <div className='tw-fixed tw-bottom-0 tw-right-0 tw-m-5 tw-z-[2] tw-rounded-full tw-bg-indigo-900 tw-overflow-hidden tw-shadow-md tw-shadow-gray-700' onClick={() => {setShow(true)}}>
            <button type="button" className='tw-outline-none tw-p-2 tw-text-white tw-lh-1 tw-text-xl hover:tw-text-3xl tw-transition-all'>
                <div className='tw-border-2 tw-border-white tw-rounded-full tw-p-5 tw-flex tw-items-center tw-justify-center tw-relative'>
                    <FiPlus className='tw-absolute' />
                </div>
            </button>
        </div>
    )
}

export default NewBtn