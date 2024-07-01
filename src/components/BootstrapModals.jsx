import React from 'react'
import { Spinner } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import '../styles/modalsConfig.css';

export const Loader = ({ show, text }) => {
    return (
        <>
            <Modal show={show} style={{ backdropFilter: 'blur(3px) brightness(0.75)' }} centered>
                <Modal.Body className='tw-bg-neutral-50 dark:tw-bg-gray-800 tw-rounded-lg tw-bg-opacity-90 tw-backdrop-blur-md tw-border tw-border-gray-700'>
                    <div className='tw-flex tw-items-center tw-gap-3'>
                        <Spinner animation="border" variant="light" />
                        <span className='tw-text-neutral-50 tw-text-lg tw-tracking-wider tw-font-semibold'>
                            {text ?
                                <span>{text}</span>
                                :
                                <span>Please wait ...</span>
                            }
                        </span>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}


export const FullScreenModal = ({
    show,
    setShow,
    title,
    tags,
    notes
}) => {

    return (
        <Modal show={show} onHide={() => setShow({ show: false })} size={'lg'} centered={true} scrollable={true} className={`tw-rounded-lg`}>
            <Modal.Header closeButton className={`tw-bg-indigo-950 py-2 tw-text-white`}>
                <Modal.Title>
                    {title ? title : 'Your Note'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className={`tw-bg-neutral-50`}>

                <div>
                    <span className="tw-font-semibold tw-text-lg tw-text-indigo-800">
                        {title}
                    </span>
                </div>

                <div className={`${tags && 'tw-mb-4'}`}>
                    {notes}
                </div>

                <div className="tw-w-full">
                    <div className='tw-flex flex-wrap gap-2'>
                        {tags?.map((tag, idx) => {
                            return (
                                <span key={`full-screen-${tag}-${idx}`} className="tw-cursor-default tw-px-2 tw-py-1 tw-bg-indigo-900 tw-rounded-sm tw-text-xs tw-uppercase tw-text-white before:tw-content-['#'] before:tw-inline-block before:tw-me-1">{tag}</span>
                            )
                        })}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}