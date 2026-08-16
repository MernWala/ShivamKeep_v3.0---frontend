import React, { useState } from 'react';
import { AiOutlineFullscreen } from "react-icons/ai";
import { MdDeleteSweep, MdEditSquare, MdFullscreen, MdShare, MdWarning } from 'react-icons/md';
import type { Note } from '../schemas/interface';
import { IoInformationCircleOutline } from 'react-icons/io5';
import { useDeleteNoteMutation, useToggleShareMutation } from '../store/rtk/notes.api';
import { NoteCreateUpdateModal, NotesPresenterModal } from './Modals';

export const NoteCard = ({
    title,
    notes,
    tags,
    _id,
    shared,
    sharedMode,
    createdAt,
    updatedAt
}: Note & { sharedMode: boolean }) => {
    const [message, setMessage] = useState<string>("");
    const [deleteNote] = useDeleteNoteMutation();
    const [toggleShare] = useToggleShareMutation();

    const [fullModalShow, setFullModalShow] = useState<boolean>(false);
    const [fullModalNote, setFullModalNote] = useState<Note>();

    const handleDelete = async (id: string) => {
        if (!id) return;
        try {
            const cnf = window.confirm("Are you really want to delte it?");
            if (cnf)
                await deleteNote(id).unwrap();
            return;
        } catch (err) {
            console.error("Failed to delete note: ", err);
        }
    };

    const handleToggleShare = async (id: string) => {
        if (!sharedMode && id) {
            try {
                await toggleShare(id).unwrap();
            } catch (err) {
                console.error("Failed to toggle share: ", err);
            }
        } else {
            setMessage("sharedMode");
        }
    };

    const handleSetFullScreen = () => {
        setFullModalShow(true);
        setFullModalNote({ notes, shared, tags, title, _id, createdAt, updatedAt });
    };

    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const [updateModalView, setUpdateModalView] = useState<boolean>(false);
    const handleModify = () => {
        setUpdateModalView(true);
    };

    return (
        <React.Fragment>
            {fullModalShow &&
                <NotesPresenterModal show={fullModalShow} setShow={setFullModalShow} note={fullModalNote} />
            }

            <NoteCreateUpdateModal action='update' setShow={setUpdateModalView} show={updateModalView} key={`UpdateNote-${_id}`} note={{ notes, shared, tags, title, _id, createdAt, updatedAt }} />

            <div className='p-3 lg:w-1/3 md:w-1/2 sm:w-1/2 min-w-[300px] w-full'>
                <div className="p-0 bg-white shadow-md rounded-md h-full flex flex-col">
                    <div className={`bg-gray-700 p-2 rounded-md rounded-b-none flex justify-between items-center relative ${shared === true ? 'border-b-4' : ''} border-green-600`}>
                        <div className={`${message?.length > 0 ? 'opacity-100' : 'opacity-0'} transition-all absolute w-full h-full left-0 flex items-center justify-center z-[0]`}>
                            <span className='text-neutral-50 text-sm'>
                                {message === "delete" &&
                                    <span className='flex items-center gap-1'>
                                        <MdDeleteSweep className='text-base' />
                                        Delete Note
                                    </span>
                                }
                                {message === "edit" &&
                                    <span className='flex items-center gap-1'>
                                        <MdEditSquare className='text-base' />
                                        Edit Note
                                    </span>
                                }
                                {message === "share" &&
                                    <span className='flex items-center gap-1'>
                                        <MdShare className='text-base' />
                                        Share Note
                                    </span>
                                }
                                {message === "view" &&
                                    <span className='flex items-center gap-1'>
                                        <MdFullscreen className='text-base' />
                                        Full Screen
                                    </span>
                                }
                                {message === "sharedMode" &&
                                    <span className='flex items-center gap-1'>
                                        <MdWarning className='text-base' />
                                        Restricted in shared mode
                                    </span>
                                }
                            </span>
                        </div>
                        <div className='flex items-center gap-2 z-[1]'>
                            <button
                                onClick={() => { if (sharedMode === false) { handleDelete(_id ?? "") } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('delete') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='p-2 transition hover:transition bg-red-600 hover:bg-red-700 rounded-full'>
                            </button>

                            <button
                                onClick={() => { if (sharedMode === false) { handleToggleShare(_id ?? "") } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('share') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='p-2 transition hover:transition bg-green-600 hover:bg-green-700 rounded-full'>
                            </button>

                            <button
                                onClick={() => { if (sharedMode === false) { handleModify() } }}
                                onMouseEnter={() => { if (sharedMode === true) { setMessage('sharedMode') } else { setMessage('edit') } }}
                                onMouseLeave={() => { setMessage('') }}
                                type="button"
                                className='p-2 transition hover:transition bg-yellow-300 hover:bg-yellow-400 rounded-full'>
                            </button>
                        </div>
                        <div className='flex w-8 items-center justify-center z-[1]'>
                            <button type="button" className='block absolute' onClick={handleSetFullScreen} onMouseLeave={() => { setMessage('') }} onMouseEnter={() => { setMessage('view') }}>
                                <div className="text-white text-lg transition-all hover:text-2xl">
                                    <AiOutlineFullscreen className="text-current" />
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-wrap flex-grow-[1]'>
                        <div className='p-2 w-full'>
                            <div className='flex items-center content-center'>
                                <span className="block font-semibold flex-grow-[1]">{title}</span>
                                <span className='w-4'>
                                    <button
                                        type="button"
                                        className='!cursor-auto'
                                        title={`Created: ${formatter.format(new Date(createdAt ?? ""))} | Updated: ${formatter.format(new Date(updatedAt ?? ""))}`}
                                    >
                                        <IoInformationCircleOutline />
                                    </button>
                                </span>
                            </div>
                            <div className='my-1'>
                                {notes?.length > 130 ?
                                    <React.Fragment>
                                        {notes}{"... "}
                                        <span
                                            onClick={handleSetFullScreen}
                                            onMouseLeave={() => { setMessage('') }}
                                            onMouseEnter={() => { setMessage('view') }}
                                            className='text-sm text-indigo-800 cursor-pointer underline select-none'
                                        >
                                            more
                                        </span>
                                    </React.Fragment>
                                    :
                                    notes
                                }
                            </div>
                        </div>
                        <div className="p-2 pt-0 w-full">
                            <div className='flex flex-wrap gap-2'>
                                {tags?.map((tag, idx) => {
                                    return (
                                        <span key={`tag-${tag}-${idx}`} className="cursor-default px-2 py-1 bg-indigo-900 rounded-sm text-xs uppercase text-white before:content-['#'] before:inline-block before:me-1">{tag}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};