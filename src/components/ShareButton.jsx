import React, { useContext, useState } from 'react'
import { MdCheck, MdShare } from 'react-icons/md'
import GenralContext from '../context/GenralContext'

const ShareButton = () => {

    const [click, setClick] = useState(false)
    const { userDetails } = useContext(GenralContext)

    const handleCopy = () => {
        setClick(true)
        navigator.clipboard.writeText(`${window.location?.host}/#/shared-notes/${userDetails?._id}`)
        setTimeout(() => {
            setClick(false)
        }, 1500);
    }

    return (
        <button
            onClick={handleCopy}
            type='button'
            className={'tw-mx-1 tw-outline-none focus:tw-ring-2 tw-ring-indigo-600 tw-bg-indigo-900 tw-px-4 tw-py-2 tw-rounded-full tw-font-semibold tw-text-neutral-50 tw-flex tw-items-center gap-1'}
        >
            {click ?
                <>
                    <MdCheck className={'tw-text-2xl'} />
                    Copied
                </>
                :
                <>
                    <MdShare className={'tw-text-2xl'} />
                    Share Link
                </>
            }
        </button>
    )
}

export default ShareButton