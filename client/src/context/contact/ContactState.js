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
            const res = await axios.get('/api/contacts', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch({ type: GET_CONTACTS, payload: res.data.contacts })
        } catch (err) {
            dispatch({ type: CLEAR_CONTACT, payload: err.response.msg })
        }

    }

    // Add Contact
    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
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
    const deleteContact = async id => {
        try {
            await axios.delete(`/api/contacts/${id}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response.msg })
        }

    }
    // Update Current Contact
    const updateContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)

            dispatch({ type: UPDATE_CONTACT, payload: res.data.contact })
        } catch (err) {
            dispatch({ type: CONTACT_ERROR, payload: err.response })
        }
    }
    // Set Current Contact
    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    // Clear current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    // Filter Contacts
    const filterContacts = text => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    const clearContacts = () => {
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
            clearContacts
        }}
    >
        {props.children}
    </ContactContext.Provider>
}

export default ContactState