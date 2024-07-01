import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdDeleteSweep, MdEditSquare, MdFullscreen, MdShare, MdWarning } from 'react-icons/md';
import GenralContext from '../context/GenralContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Notes = ({
    title,
    noteText,
    tags,
    _id,
    isShared,
    sharedMode
}) => {

    const { setfullScreenInfo, setModifyNotes, setOffcanvas, backendHost, setNotes, setLoaderData } = useContext(GenralContext)

    const [message, setMessage] = useState()
    const [string, setString] = useState(noteText)

    useEffect(() => {
        if (string?.length > 130) {
            setString(string?.substr(0, 130) + " ... ")
        }
    }, [])

    const handleSetFullScreen = () => {
        setfullScreenInfo({
            show: true,
            title: title,
            tags: tags,
            notes: noteText
        })
    }

    const handleModify = () => {
        setOffcanvas(true)
        setModifyNotes({ title, notes: noteText, tags, _id, shared: isShared })
    }

    const toggleShare = async (id, shareFlag) => {
        try {

            let cnf = false
            if (shareFlag === true) {
                cnf = window.confirm("Turn off sharing for this notes?")
            } else {
                cnf = window.confirm("Turn on sharing for this notes?")
            }

            if (cnf === true) {
                setLoaderData({
                    show: true,
                    text: 'Updating sharing option'
                })

                let response = await axios.post(`${backendHost}/api/notes/toggle-share?flag=${!shareFlag}`, {
                    _id: id
                }, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setNotes((prev) => {
                        return prev.map((note) => {
                            if (note._id === response?.data?._id)
                                return { ...note, shared: response?.data?.shared }
                            return note
                        })
                    })

                    toast.success(`Sharing ${shareFlag === true ? 'off' : 'on'}`)
                    setLoaderData({})
                }
            }

        } catch (error) {

            toast.error("Value update failed")
            setLoaderData({})
            console.error(error);

        }
    }

    const handleDelete = async (id) => {
        try {

            let cnf = window.confirm("Are your sure to delete this notes?")
            if (cnf === true) {
                let response = await axios.post(`${backendHost}/api/notes/delete-note`, { id }, {
                    withCredentials: true
                })

                if (response?.status === 200) {
                    toast.success("Notes Deleted")
                    setNotes((prev) => {
                        return prev.filter((note) => { return note?._id !== id })
                    })
                }
            }

        } catch (error) {
            toast.error("Somthing went wrong")
            console.error(error);
        }
    }

    return (
        <>
            <div className='tw-p-3 lg:tw-w-1/3 md:tw-w-1/2 sm:tw-w-1/2 tw-min-w-[300px] tw-w-full'>
                <div className="tw-p-0 tw-bg-white tw-shadow-md tw-rounded-md tw-h-full tw-flex tw-flex-col">
                    <div className={`tw-bg-gray-700 tw-p-2 tw-rounded-md tw-rounded-b-none tw-flex tw-justify-between tw-items-center tw-relative ${isShared === true ? 'tw-border-b-4' : ''} tw-border-green-600`}>
                        <div className={` ${message?.length > 0 ? 'tw-opacity-100' : 'tw-opacity-0'} tw-transition-all tw-absolute tw-w-full tw-h-full tw-left-0 tw-flex tw-items-center tw-justify-center tw-z-[0]`}>
                            <span className='tw-text-neutral-50 tw-text-sm'>
                                {message === "delete" &&
                                    <span className='tw-flex tw-items-center gap-1'><MdDeleteSweep className='tw-text-base' /> <>Delete Note</></span>
                                }
                                {message === "edit" &&
                                    <span className='tw-flex tw-items-center gap-1'><MdEditSquare className='tw-text-base' /> <>Edit Note</></span>
                                }
                                {message === "share" &&
                                    <span className='tw-flex tw-items-center gap-1'><MdShare className='tw-text-base' /> <>Share Note</></span>
                                }
                                {message === "view" &&
                                    <span className='tw-flex tw-items-center gap-1'><MdFullscreen className='tw-text-base' /> <>Full Screen</></span>
                                }
                                {message === "sharedMode" &&
                                    <span className='tw-flex tw-items-center gap-1'><MdWarning className='tw-text-base' /> <>Restricted in shared mode</></span>
                                }
                            </span>
                        </div>
                        <div className='tw-flex tw-items-center tw-gap-2 tw-z-[1]'>
                            <button
                                onClick={() => { if (!sharedMode || sharedMode === false) { handleDelete(_id) } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('delete') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='tw-p-2 tw-transition hover:tw-transition tw-bg-red-600 hover:tw-bg-red-700 tw-rounded-full'>
                            </button>

                            <button
                                onClick={() => { if (!sharedMode || sharedMode === false) { toggleShare(_id, isShared) } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('share') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='tw-p-2 tw-transition hover:tw-transition tw-bg-green-600 hover:tw-bg-green-700 tw-rounded-full'>
                            </button>

                            <button
                                onClick={() => { if (!sharedMode || sharedMode === false) { handleModify() } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('edit') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='tw-p-2 tw-transition hover:tw-transition tw-bg-yellow-300 hover:tw-bg-yellow-400 tw-rounded-full'>
                            </button>
                        </div>
                        <div className='tw-flex tw-w-8 tw-items-center tw-justify-center tw-z-[1]'>
                            <button type="button" className='tw-block tw-absolute' onClick={handleSetFullScreen} onMouseLeave={() => { setMessage('') }} onMouseEnter={() => { setMessage('view') }}>
                                <div className="tw-text-white tw-text-lg tw-transition-all hover:tw-text-2xl">
                                    <AiOutlineFullscreen className="tw-text-current" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='tw-flex tw-flex-wrap tw-flex-grow-[1]'>
                        <div className='tw-p-2 tw-w-full'>
                            <span className="tw-block tw-font-semibold">{title}</span>
                            <div className='tw-my-1'>
                                {string?.length > 130 ?
                                    <>
                                        {string}
                                        <span
                                            onClick={handleSetFullScreen}
                                            onMouseLeave={() => { setMessage('') }}
                                            onMouseEnter={() => { setMessage('view') }}
                                            className='tw-text-sm tw-text-indigo-800 tw-cursor-pointer tw-underline'>
                                            more
                                        </span>
                                    </>
                                    : noteText
                                }
                            </div>
                        </div>
                        <div className="tw-p-2 tw-pt-0 tw-w-full">
                            <div className='tw-flex flex-wrap gap-2'>
                                {tags?.map((tag, idx) => {
                                    return (
                                        <span key={`tag-${tag}-${idx}`} className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">{tag}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Notes