import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
} from '../types';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    };
    //'state' gives us access to state. 'dispatch' allows us to dispatch to reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load user
    const loadUser = async () => {
        //load token into global headers
        setAuthToken(localStorage.token);

        try {
            const res = await axios.get('/api/auth');

            dispatch({
                type: USER_LOADED,
                payload: res.data //user data
            });
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
            })
        }
    }

    //Register user
    const register = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config);
            
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data //this is the token getting back sent to us from backend
            });

            loadUser();
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message //"message" is the error message sent from '/api/users' route if user already exists
            })
        }
    }

    //Login user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            console.log(formData);
            const res = await axios.post('/api/auth', formData, config)
            
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data //this is the token getting back sent to us from backend
            });

            loadUser();
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.message //"message" is the error message sent from '/api/users' route if user already exists
            })
        }
    }

    //Logout user
    const logout = () => {
        dispatch({type: LOGOUT})
    }

    //Clear errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                user: state.user,
                loading: state.loading,
                error: state.error,
                register: register,
                clearErrors: clearErrors,
                loadUser: loadUser,
                login: login,
                logout: logout
            }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;

