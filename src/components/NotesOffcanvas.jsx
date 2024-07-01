import React, { useContext, useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import GenralContext from '../context/GenralContext'
import { Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const NotesOffcanvas = ({
    show, setShow
}) => {

    const { backendHost, handleOnChange, modifyNotes, setModifyNotes, notes, setNotes } = useContext(GenralContext)

    const [formData, setFormData] = useState({})
    const [tags, setTags] = useState(null)
    const [formProcess, setFormProcess] = useState(false)

    useEffect(() => {

        let str = formData?.tags ?? ""
        let arr = str.split(",")
        setTags(() => {
            return str.length === 0 ? [] : arr
        })

    }, [formData?.tags])


    useEffect(() => {
        if (modifyNotes)
            setFormData({ ...modifyNotes, tags: modifyNotes?.tags.join() })
    }, [modifyNotes])

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            setFormProcess(true)
            if (modifyNotes) {

                let response = await axios.put(`${backendHost}/api/notes`, { ...formData, tags }, {
                    withCredentials: true
                })

                if (response.status === 200) {

                    setNotes((old) => {
                        const filteredNotes = old.filter(note => note?._id !== response?.data?._id);
                        return [response?.data, ...filteredNotes];
                    })

                    toast.success("Notes Updated")
                    setModifyNotes(undefined)

                } else {
                    toast.error("Somthing went wrong")
                }

            } else {

                let response = await axios.post(`${backendHost}/api/notes`, { ...formData, tags }, {
                    withCredentials: true
                })

                if (response.status === 201) {
                    setNotes([...notes, response?.data])
                    toast.success("Notes Created")
                } else {
                    toast.error("Somthing went wrong")
                }
            }

        } catch (error) {

            if (error?.response?.status === 400) {
                toast.error(error?.response?.data)
            }


        } finally {
            setFormData(null)
            setFormProcess(false)
            setShow(false)
        }

    }


    return (
        <Offcanvas show={show} onHide={() => { setShow(false); setModifyNotes(undefined); setFormData({}) }} placement={'end'} backdropClassName='tw-backdrop-blur-sm'>
            <Offcanvas.Header closeButton className='tw-bg-gray-800 tw-border-b tw-border-white'>
                <Offcanvas.Title className={'text-white'}>
                    {formData?.title ? formData?.title : <>New Note</>}
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='tw-bg-gray-800 tw-text-white'>

                <div className='tw-mb-4'>
                    <div className="tw-flex tw-flex-wrap tw-gap-2">
                        {tags?.map((tag, idx) => {
                            return (
                                <span
                                    key={`tag-${tag}-${idx}`}
                                    className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-neutral-100 tw-rounded-sm tw-text-xs tw-uppercase tw-text-indigo-900 before:tw-content-['#'] before:tw-inline-block before:tw-me-1">
                                    {tag}
                                </span>
                            )
                        })}
                    </div>
                </div>

                <form onSubmit={(e) => { handleSubmitForm(e) }}>
                    <div className="tw-space-y-3">
                        <div>
                            <input type="text" name="tags" id="tags"
                                className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                placeholder="Tag-1, Tag-2, Tag-3, Tag-4, Tag-5 ..."
                                value={formData?.tags ?? ''}
                                onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                            />
                        </div>
                        <div>
                            <input type="text" name="title" id="title"
                                className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500"
                                placeholder="Any Title?"
                                value={formData?.title ?? ''}
                                onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                            />
                        </div>
                        <div>
                            <textarea name="notes" id="notes"
                                className="tw-bg-gray-50 focus:tw-outline-none focus:tw-ring-2 tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg focus:tw-ring-primary-600 focus:tw-border-primary-600 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-blue-500 dark:focus:tw-border-blue-500 tw-min-h-[150px]"
                                placeholder="Your Note ...*"
                                value={formData?.notes ?? ''}
                                onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                            />
                        </div>
                        <div className='tw-w-full'>
                            <div className="tw-flex tw-items-center tw-justify-start tw-w-full tw-gap-1">
                                <input type="checkbox" name="shared" id="shared"
                                    checked={formData?.shared === true ? true : false}
                                    onChange={(e) => { setFormData({ ...formData, shared: e.target.checked }) }}
                                    className="tw-bg-gray-50 focus:tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-rounded-lg tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white"
                                />
                                <label htmlFor="shared" className='tw-select-none tw-font-light tw-tracking-wide tw-text-sm'>Marked as shared</label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className={`tw-w-full tw-text-white tw-bg-primary-600 tw-hover:bg-primary-700 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-primary-300 tw-font-medium tw-rounded-lg tw-text-sm tw-px-5 tw-py-2.5 tw-text-center dark:tw-bg-primary-600 dark:tw-hover:bg-primary-700 dark:focus:tw-ring-primary-800 tw-flex tw-items-center tw-gap-1 tw-justify-center`}>
                                {formProcess === true &&
                                    <Spinner animation="border" variant="light" size='sm' />
                                }
                                {modifyNotes ? 'Update Note' : 'Create Note'}
                            </button>
                        </div>
                    </div>
                </form>

            </Offcanvas.Body>
        </Offcanvas >
    );
}

export default NotesOffcanvas