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
        contacts: [],
        current: null,
        filtered: null
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
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    // Clear current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    // Update Current Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact })
    }
    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }
    return <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}
    >
        {props.children}
    </ContactContext.Provider>
}

export default ContactState