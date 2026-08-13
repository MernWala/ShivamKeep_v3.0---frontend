import { NewNotesObject, Note } from "../schemas/interface"
import { IoIosCloseCircle } from 'react-icons/io'
import React, { ChangeEvent, ReactNode, useMemo, useRef, useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { MDXEditorMethods } from '@mdxeditor/editor';
import { Editor } from './Editor';
import { useAddNoteMutation, useUpdateNoteMutation } from "../store/rtk/notes.api";
import toast from "react-hot-toast";

export const BaseModal = ({ show, close, title, children }: {
    show: boolean,
    close: () => void,
    title: string,
    children: ReactNode,
}) => {
    return (
        <Dialog open={show} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-sm backdrop-brightness-50">
                    <DialogPanel transition className="sm:w-full md:w-1/2 rounded bg-white/5 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 overflow-hidden shadow-md">
                        <DialogTitle as="h3" className="text-xl font-medium text-white bg-indigo-900 px-3 py-2 flex items-center justify-between w-full">
                            <span> {title} </span>
                            <button type="button" className='outline-none' onClick={close}> <IoIosCloseCircle className="text-white" /> </button>
                        </DialogTitle>
                        {children}
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export const NotesPresenterModal = ({ show, setShow, note }: {
    show: boolean
    setShow: (prev: boolean) => void,
    note?: Note
}) => {
    const close = () => setShow(false);
    return (
        <BaseModal close={close} show={show} title={note?.title ?? ""} key={note?._id ?? ""}>
            <div className="bg-neutral-50 p-2">
                <pre className={`${note?.tags && 'mb-4'} text-wrap font-[unset]`}> {note?.notes} </pre>
                <div className="w-full">
                    <div className='flex flex-wrap gap-2'>
                        {note?.tags?.map((tag, idx) => {
                            return (
                                <span key={`full-screen-${tag}-${idx}`} className="cursor-default px-2 py-1 bg-indigo-900 rounded-sm text-xs uppercase text-white before:content-['#'] before:inline-block before:me-1">{tag}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </BaseModal>
    )
}

function debounce<Args extends unknown[], R>(func: (...args: Args) => R, delay: number) {
    let timer: ReturnType<typeof setTimeout> | null = null;
    return (...args: Args): void => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
    };
}

export const NoteCreateUpdateModal = ({ show, action, note, setShow }: {
    show: boolean,
    action: 'create' | 'update',
    note?: Note,
    setShow: (prev: boolean) => void
}) => {
    const [createNote] = useAddNoteMutation();
    const [updateNote] = useUpdateNoteMutation();
    const editorRef = useRef<MDXEditorMethods>(null);
    const [defaultNoteValue] = useState<NewNotesObject>({ title: "", shared: false, tags: [], notes: "" });
    const [modalTitle] = useState<string>(action === 'create' ? 'Create Note' : 'Update Note');
    const [formData, setFormData] = useState<NewNotesObject | Note>(() => action === 'create' ? defaultNoteValue : (note ?? defaultNoteValue));

    const close = () => {
        setShow(false)
        setFormData(defaultNoteValue);
    };

    const debouncedUpdate = useMemo(() =>
        debounce((name: string, value: string | string[] | boolean) => {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }, 500),
        []
    );

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        switch (name) {
            case 'title': {
                debouncedUpdate('title', value);
                break;
            }

            case 'tags': {
                const tagsArray = value.split(",").map(v => v.trim()).filter(Boolean);
                debouncedUpdate('tags', tagsArray);
                break;
            }

            case 'shared': {
                setFormData((prevData) => ({ ...prevData, shared: checked }));
                break;
            }
        }
    };

    const handleOnSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (action === "create") {
                const response = await createNote(formData).unwrap();
                if (response.data.note?._id) {
                    close();
                    toast.success("Notes created");
                }
            } else {
                const response = await updateNote(formData).unwrap();
                if (response.data.note?._id) {
                    close();
                    toast.success("Notes updated");
                }
            }
        } catch (error) {
            const message = error instanceof Error ? error?.message : String(error);
            console.log(message);
            toast.error("Something went wrong. Contact admin.");
        } finally {
            setFormData(defaultNoteValue);
        }
    }

    return (
        <React.Fragment>
            <BaseModal close={close} show={show} title={modalTitle} key={`NoteCreateUpdateModal-${modalTitle}-${note?._id}`}>
                <div className="bg-white p-3">
                    <form className={'w-full'} onSubmit={handleOnSubmit}>
                        <div className='mb-3'>
                            <input
                                type={"text"}
                                name={"title"}
                                placeholder={"Tilte goes here"}
                                className={"ring-1 focus:ring-2 outline-none rounded px-2 py-1 ring-indigo-600 w-full"}
                                onChange={handleOnChange}
                                defaultValue={formData?.title}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                type={"text"}
                                name={"tags"}
                                placeholder={"Tags (Example: Daily Task, Today'd deadline, Todo, etc."}
                                className={"ring-1 focus:ring-2 outline-none rounded px-2 py-1 ring-indigo-600 w-full"}
                                onChange={handleOnChange}
                                defaultValue={formData?.tags}
                            />
                        </div>
                        <div className='mb-3'>
                            <Editor
                                editorRef={editorRef}
                                initialMarkdown={formData?.notes}
                                onChange={(newMarkdown) => debouncedUpdate('notes', newMarkdown)}
                                className="ring-1 focus:ring-2 outline-none rounded ring-indigo-600 w-full"
                            />
                        </div>
                        <div className='mb-3'>
                            <div className="flex gap-1">
                                <input type="checkbox" name="shared" id="shared" onChange={handleOnChange} checked={formData?.shared} />
                                <label htmlFor="shared" className='text-xs select-none'> Marked as shared notes? </label>
                            </div>
                        </div>
                        <div>
                            <button type="submit" className='bg-indigo-700 w-full rounded py-1 text-white font-medium'> {modalTitle} </button>
                        </div>
                    </form>
                </div>
            </BaseModal>
        </React.Fragment>
    )
}