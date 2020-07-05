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

    // //Clear recipes
    // const clearRecipes = () => {
    //     dispatch({ type: CLEAR_RECIPES });
    // }

    //Add recipe
    const addRecipe = async recipe => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/recipes', recipe, config) //don't need to pass token in here because it's set globally in setAuthToken.js as long as token is in localStorage

            dispatch({
                type: ADD_RECIPE,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: RECIPE_ERROR,
                payload: error.response.message
            })
        }
    }

    // //Delete recipe
    // const deleteRecipe = async id => {
    //     try {
    //         await axios.delete(`/api/recipes/${id}`);
    //         dispatch({
    //             type: DELETE_RECIPE,
    //             payload: id
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: RECIPE_ERROR,
    //             payload: error.response.message
    //         })
    //     }
    // }

    //Update recipe
    // const updateRecipe = async recipe => {
    //     const config = {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     try {
    //         const res = await axios.put(`/api/recipes/${recipe._id}`, recipe, config);
    //         dispatch({ 
    //             type: UPDATE_RECIPE, 
    //             payload: res.data
    //         });
    //     } catch (error) {
    //         dispatch({
    //             type: RECIPE_ERROR,
    //             payload: error.response.message
    //         })
    //     }
    // }

    //Set current contact
    const setCurrent = (recipe) => {
        dispatch({ type: SET_CURRENT, payload: recipe })
    }

    //Clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // //Filter recipes
    // const filterRecipes = (text) => {
    //     dispatch({ type: FILTER_RECIPES, payload: text })
    // }

    // //Clear filter
    // const clearFilter = () => {
    //     dispatch({ type: CLEAR_FILTER })
    // }

    return (
        <RecipesContext.Provider
            value={{
                recipes: state.recipes, //'state' comes from useReducer
                current: state.current,
                error: state.error,
                addRecipe: addRecipe,
                // deleteRecipe: deleteRecipe,
                clearCurrent: clearCurrent,
                setCurrent: setCurrent,
                // updateRecipe: updateRecipe,
                // filtered: state.filtered,
                // clearFilter: clearFilter,
                // filterRecipes: filterRecipes,
                getRecipes: getRecipes
                // clearRecipes: clearRecipes
            }}>
            {props.children}
        </RecipesContext.Provider>
    )
}

export default RecipesState;

