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

export default (state, action) => {
    switch (action.type) {
        case GET_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                loading: false
            };
        case ADD_RECIPE:
            return {
                ...state,
                recipes: [action.payload, ...state.recipes],
                loading: false
            };
        case DELETE_RECIPE:
            return {
                ...state,
                recipes: state.recipes.filter(recipe => {
                    return recipe._id !== action.payload
                }),
                loading: false
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case RECIPE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state
    }
}