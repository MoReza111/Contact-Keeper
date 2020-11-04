import React, { useReducer } from 'react'
import uuid from 'uuid'
import ContactContext from './contactContext'
import ContactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER
} from '../type'

const ContactState = props => {
    const initialState = {
        contacts: []
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // Add Contact
    const addContact = contact => {
        dispatch({ type: ADD_CONTACT, payload: contact })
    }
    // Delete Contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    }
    // Set Current Contact

    // Clear current Contact

    return <ContactContext.Provider
        value={{
            contacts: state.contacts,
            addContact,
            deleteContact
        }}
    >
        {props.children}
    </ContactContext.Provider>
}

export default ContactState