import React, { useContext, useState } from 'react'
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
            className={'tw-outline-none hover:tw-font-semibold tw-w-full py-1 tw-text-start tw-px-4 focus:tw-font-normal'}
        >
            {click ?
                <>
                    Copied
                </>
                :
                <>
                    Copy Share Link
                </>
            }
        </button>
    )
}

export default ShareButton