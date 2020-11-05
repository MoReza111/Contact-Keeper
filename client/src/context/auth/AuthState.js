import React, { useReducer } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './AuthReducer'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../type'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    // Load User
    const loadUser = async () => {
        try {
            const res = await axios.get('/api/users/user', {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            dispatch({ type: USER_LOADED, payload: res.data })
        } catch (err) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    // Register Users
    const signup = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users/signup', formData, config)

            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
        } catch (err) {
            dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg })
        }
    }

    // Login user
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth/login', formData, config)

            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
        } catch (err) {
            dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg })
        }

    }
    // Logout
    const logOut = () => dispatch({ type: LOGOUT })

    // Clear Error
    const clearError = () => dispatch({ type: CLEAR_ERRORS })

    return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            signup,
            loadUser,
            login,
            logOut,
            clearError
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState