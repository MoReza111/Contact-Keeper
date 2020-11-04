import React, { useReducer } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './AlertReducer'
import { v4 } from 'uuid'
import {
    SET_ALERT,
    REMOVE_ALERT
} from '../type'

const AlertState = props => {
    const initialState = []

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    // Set Alert
    const setAlert = (message, type, timeout = 5000) => {
        const id = v4()
        dispatch({ type: SET_ALERT, payload: { message, type, id } })

        setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout)
    }

    return <AlertContext.Provider
        value={{
            alerts: state,
            setAlert
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState