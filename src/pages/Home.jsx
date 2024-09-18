import React, { useContext, useEffect } from 'react'
import NewBtn from '../components/NewBtn'
import Notes from '../components/Notes'
import Header from '../components/Header'
import NotesOffcanvas from '../components/NotesOffcanvas'
import axios from 'axios'
import GenralContext from '../context/GenralContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FullScreenModal, Loader } from '../components/BootstrapModals'

const Home = () => {

    const {
        backendHost, userDetails, setUserDetails, notes, setNotes,
        fullScreenInfo, setfullScreenInfo, Offcanvas, setOffcanvas,
        loaderData
    } = useContext(GenralContext)

    const navigate = useNavigate()


    // middleware to check is user authentic
    useEffect(() => {

        (async () => {

            try {

                let response = await axios.post(`${backendHost}/api/auth/get-user`, {}, {
                    withCredentials: true
                })

                if (response.status === 200) {
                    setUserDetails(response?.data)
                    if (response?.data?.isVerified === false) {
                        toast.error("Verify your account")
                        setTimeout(() => {
                            navigate('/account/verify-email')
                        }, 500);
                    }
                }

            } catch (error) {

                if (error?.response?.data === "Token Not Found") {
                    navigate('/')
                } else {
                    toast.error("Server error")
                    console.error(error);
                }
            }

        })();
        // eslint-disable-next-line
    }, [backendHost])


    // getting saved notes
    useEffect(() => {

        (async () => {
            if (userDetails) {
                try {
                    let response = await axios.get(`${backendHost}/api/notes`, {
                        withCredentials: true
                    })

                    if (response.status === 200) {
                        setNotes(response?.data)
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        })();

    }, [userDetails, backendHost, setNotes])


    return (
        <>
            <FullScreenModal show={fullScreenInfo?.show} setShow={setfullScreenInfo} title={fullScreenInfo?.title} tags={fullScreenInfo?.tags} notes={fullScreenInfo?.notes} />
            <Header />
            <Loader show={loaderData?.show} text={loaderData?.text} />
            <div className='tw-bg-neutral-100 tw-min-h-[85.2vh] tw-relative'>
                <NotesOffcanvas show={Offcanvas} setShow={setOffcanvas} />
                <NewBtn setShow={setOffcanvas} />

                <div className='md:tw-p-10 tw-p-3'>
                    <div className={`tw-flex tw-flex-wrap ${(notes?.length < 3 && notes?.length > 0) ? 'tw-justify-start' : 'tw-justify-center'}`}>
                        {notes?.map((note, idx) => {
                            return (
                                <Notes key={`${note?._id}-its-index-${idx}`} isShared={note?.shared} title={note?.title} noteText={note?.notes} tags={note?.tags} _id={note?._id} />
                            )
                        })}

                        {notes?.length === 0 &&
                            <div className='tw-min-h-96 tw-flex tw-items-center'>
                                <span className='tw-text-indigo-700 tw-capitalize tw-block text-center'>No notes available! Try to add some by clicking right bottom button</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home