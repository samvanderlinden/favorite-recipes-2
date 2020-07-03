import React, { useReducer } from 'react';
import axios from 'axios';
import RecipesContext from './recipesContext';
import recipesReducer from './recipesReducer';
import {
    ADD_RECIPE,
    DELETE_RECIPE,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_RECIPE,
    FILTER_RECIPES,
    CLEAR_FILTER,
    RECIPE_ERROR,
    GET_RECIPES,
    CLEAR_RECIPES
} from '../types';

const RecipesState = props => {
    const initialState = {
        recipes: [],
        current: null,
        filtered: null,
        error: null
    };
    //'state' gives us access to state. 'dispatch' allows us to dispatch to reducer
    const [state, dispatch] = useReducer(recipesReducer, initialState);

    //Get recipes
    const getRecipes = async () => {
        try {
            const res = await axios.get('/api/recipes');
            
            dispatch({
                type: GET_RECIPES,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: RECIPE_ERROR,
                payload: error.response.message
            })
        }
    }

    // //Clear contacts
    // const clearContacts = () => {
    //     dispatch({ type: CLEAR_CONTACTS });
    // }

    // //Add contact
    // const addContact = async contact => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     try {
    //         const res = await axios.post('/api/contacts', contact, config) //don't need to pass token in here because it's set globally in setAuthToken.js as long as token is in localStorage

    //         dispatch({
    //             type: ADD_CONTACT,
    //             payload: res.data
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: CONTACT_ERROR,
    //             payload: error.response.message
    //         })
    //     }
    // }

    // //Delete contact
    // const deleteContact = async id => {
    //     try {
    //         await axios.delete(`/api/contacts/${id}`);
    //         dispatch({
    //             type: DELETE_CONTACT,
    //             payload: id
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: CONTACT_ERROR,
    //             payload: error.response.message
    //         })
    //     }
    // }

    // //Update contact
    // const updateContact = async contact => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     try {
    //         const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);
    //         dispatch({ 
    //             type: UPDATE_CONTACT, 
    //             payload: res.data
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: CONTACT_ERROR,
    //             payload: error.response.message
    //         })
    //     }
    // }

    // //Set current contact
    // const setCurrent = (contact) => {
    //     dispatch({ type: SET_CURRENT, payload: contact })
    // }

    // //Clear current contact
    // const clearCurrent = () => {
    //     dispatch({ type: CLEAR_CURRENT })
    // }

    // //Filter contacts
    // const filterContacts = (text) => {
    //     dispatch({ type: FILTER_CONTACTS, payload: text })
    // }

    // //Clear filter
    // const clearFilter = () => {
    //     dispatch({ type: CLEAR_FILTER })
    // }

    return (
        <RecipesContext.Provider
            value={{
                recipes: state.recipes, //'state' comes from useReducer
                // current: state.current,
                // error: state.error,
                // addContact: addContact,
                // deleteContact: deleteContact,
                // clearCurrent: clearCurrent,
                // setCurrent: setCurrent,
                // updateContact: updateContact,
                // filtered: state.filtered,
                // clearFilter: clearFilter,
                // filterContacts: filterContacts,
                getRecipes: getRecipes
                // clearContacts: clearContacts
            }}>
            {props.children}
        </RecipesContext.Provider>
    )
}

export default RecipesState;

