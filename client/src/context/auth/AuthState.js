import React, { useReducer } from 'react'
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

    // Register Users

    // Login user

    // Logout

    // Clear Error

    return <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
        }}
    >
        {props.children}
    </AuthContext.Provider>
}

export default AuthState