import React, { useContext, useEffect, useState } from 'react'
import Notes from '../components/Notes'
import Header from '../components/Header'
import axios from 'axios'
import GenralContext from '../context/GenralContext'
import toast from 'react-hot-toast'
import { FullScreenModal } from '../components/BootstrapModals'
import { useParams } from 'react-router-dom'

const ShareMode = () => {

    const { backendHost, fullScreenInfo, setfullScreenInfo, } = useContext(GenralContext)
    const [sharedData, setSharedDate] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    let params = useParams()

    // middleware to check is user authentic
    useEffect(() => {

        (async () => {
            try {

                setIsLoading(true)
                let response = await axios.get(`${backendHost}/api/notes/shared?id=${params?._id}`, {
                    withCredentials: true
                })

                if (response?.status === 200) {
                    console.log(response?.data);
                    setSharedDate(response?.data)
                }

            } catch (error) {
                
                if (error?.response?.status === 400) {
                    toast.error(error?.response?.data)
                } else {
                    toast.error("Server Error")
                    console.error(error);
                }

            } finally {
                setIsLoading(false)
            }
        })();

    }, [backendHost])

    return (
        <>
            {isLoading ?
                <></>
                :
                <>
                    <FullScreenModal show={fullScreenInfo?.show} setShow={setfullScreenInfo} title={fullScreenInfo?.title} tags={fullScreenInfo?.tags} notes={fullScreenInfo?.notes} />
                    <Header shareMode={true} sharedModeUser={sharedData?.user} />
                    <div className='tw-bg-neutral-100 tw-min-h-[85.2vh] tw-relative'>
                        <div className='md:tw-p-10 tw-p-3'>
                            <div className={`tw-flex tw-flex-wrap ${(sharedData?.notes?.length < 3 && sharedData?.notes?.length > 0) ? 'tw-justify-start' : 'tw-justify-center'}`}>
                                {sharedData?.notes?.map((note, idx) => {
                                    return (
                                        <Notes sharedMode={true} key={`${note?._id}-its-index-${idx}`} title={note?.title} noteText={note?.notes} tags={note?.tags} _id={note?._id} />
                                    )
                                })}

                                {sharedData?.notes?.length === 0 &&
                                    <span className='tw-text-indigo-700 tw-capitalize'>No Notes Shared by <span className="tw-font-semibold">{sharedData?.user?.name}</span></span>
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ShareMode