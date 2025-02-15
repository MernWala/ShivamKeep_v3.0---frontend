import React, { useState } from 'react'
import GenralContext from './GenralContext'

const GenralState = (props) => {

    // const [backendHost] = useState('http://localhost:3001')
    const [backendHost] = useState('https://shivamkeep-v3-0-backend.onrender.com')

    const handleOnChange = (e, state, setState) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    const [userDetails, setUserDetails] = useState({})

    const [notes, setNotes] = useState([])

    const [modifyNotes, setModifyNotes] = useState()

    const [fullScreenInfo, setfullScreenInfo] = useState()

    const [Offcanvas, setOffcanvas] = useState(false)

    const [loaderData, setLoaderData] = useState({})

    const [editProfile, setEditProfile] = useState({})

    const [registrationTempState, setRegistrationTempState] = useState()

    const [isForgotPassword, setIsForgotPassword] = useState(false)

    return (
        <GenralContext.Provider value={
            {
                backendHost, handleOnChange, userDetails, setUserDetails, notes, setNotes, modifyNotes,
                setModifyNotes, fullScreenInfo, setfullScreenInfo, Offcanvas, setOffcanvas, loaderData,
                setLoaderData, editProfile, setEditProfile, registrationTempState, setRegistrationTempState,
                isForgotPassword, setIsForgotPassword
            }
        }>
            {props.children}
        </GenralContext.Provider>
    )
}

export default GenralState