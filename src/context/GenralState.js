import React, { useState } from 'react'
import GenralContext from './GenralContext'

const GenralState = (props) => {

    const [backendHost] = useState('http://localhost:3001')

    const handleOnChange = (e, state, setState) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }

    return (
        <GenralContext.Provider value={{ backendHost, handleOnChange }}>
            {props.children}
        </GenralContext.Provider>
    )
}

export default GenralState