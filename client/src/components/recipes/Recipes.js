import React, { Fragment, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
// import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
import RecipesState from '../../context/recipes/RecipesState';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Recipes = () => {
    const recipesContext = useContext(RecipesContext);

    const { recipes, getRecipes, loading } = recipesContext;

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    });

    if (recipes !== null && recipes.length === 0 && !loading) {
        return <h4>Please add a recipe</h4>
    }

    return (
        <Fragment>
            

        </Fragment>
    )
}

export default Recipes;
