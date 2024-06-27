import React from 'react'
import { AiOutlineFullscreen } from "react-icons/ai";

const Notes = () => {
    return (
        <>
            <div className='tw-p-3 tw-w-1/3 tw-min-w-[300px]'>
                <div className="tw-p-0 tw-bg-white tw-shadow-md tw-rounded-md tw-h-full tw-flex tw-flex-col">
                    <div className='tw-bg-gray-700 tw-p-2 tw-rounded-md tw-rounded-b-none tw-flex tw-justify-between tw-items-center'>
                        <div className='tw-flex tw-items-center tw-gap-2'>
                            <button type="button" className='tw-p-2 tw-transition tw-hover:transition tw-bg-red-600 tw-hover:bg-red-700 tw-rounded-full'></button>
                            <button type="button" className='tw-p-2 tw-transition tw-hover:transition tw-bg-green-600 tw-hover:bg-green-700 tw-rounded-full'></button>
                            <button type="button" className='tw-p-2 tw-transition tw-hover:transition tw-bg-yellow-300 tw-hover:bg-yellow-400 tw-rounded-full'></button>
                        </div>
                        <div className='tw-flex tw-w-8 tw-items-center tw-justify-center'>
                            <button type="button" className='tw-block tw-absolute'>
                                <div className="tw-text-white tw-text-lg tw-transition-all tw-hover:text-2xl">
                                    <AiOutlineFullscreen className="tw-text-current" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='tw-flex tw-flex-wrap tw-flex-grow-[1]'>
                        <div className='tw-p-2 tw-w-full'>
                            <span className="tw-block tw-font-semibold">Title</span>
                            <div className='tw-my-1'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, eos.
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, eos.
                            </div>
                        </div>
                        <div className="tw-p-2 tw-pt-0 tw-w-full">
                            <div className='tw-flex flex-wrap gap-2'>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                                <span className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">tag</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes