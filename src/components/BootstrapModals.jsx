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
