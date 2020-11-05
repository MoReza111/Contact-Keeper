import React, { useReducer } from 'react'
import axios from 'axios'
import ContactContext from './contactContext'
import ContactReducer from './ContactReducer'
import {
    ADD_CONTACT,
    CONTACT_ERROR,
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
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)

            dispatch({ type: ADD_CONTACT, payload: res.data.contact })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response })
        }

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
            error: state.error,
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