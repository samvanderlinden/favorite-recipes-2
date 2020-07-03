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
        case RECIPE_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state
    }
}