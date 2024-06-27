import React from 'react'
import { FiPlus } from 'react-icons/fi'

const NewBtn = () => {
    return (
        <div className='tw-fixed tw-bottom-0 tw-right-0 tw-m-5 tw-z-[2] tw-rounded-full tw-bg-violet-900 tw-overflow-hidden tw-shadow-md tw-shadow-gray-700'>
            <button type="button" className='tw-p-2 tw-text-white tw-lh-1 tw-hover:text-3xl tw-text-2xl tw-transition-all'>
                <div className='tw-border-2 tw-border-white tw-rounded-full tw-p-2 tw-flex'>
                    <FiPlus />
                </div>
            </button>
        </div>
    )
}

export default NewBtn