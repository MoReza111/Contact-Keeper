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
    CLEAR_FILTER,
    GET_CONTACTS,
    CLEAR_CONTACT
} from '../type'

const ContactState = props => {
    const initialState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(ContactReducer, initialState)

    // Get Contacts 
    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')

            dispatch({ type: GET_CONTACTS, payload: res.data.contacts })
        } catch (err) {
            dispatch({ type: CLEAR_CONTACT, payload: err.response.msg })
        }

    }

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

    const clearContact = () => {
        dispatch({ type: CLEAR_CONTACT })
    }
    return <ContactContext.Provider
        value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContact
        }}
    >
        {props.children}
    </ContactContext.Provider>
}

export default ContactState