import React, { Fragment, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
// import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Recipes = () => {
    const recipesContext = useContext(RecipesContext);

    const { recipes, getRecipes, loading } = recipesContext;

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    if (recipes !== null && recipes.length === 0 && !loading) {
        return <h4>Please add a recipe</h4>
    }

    return (
        <Fragment>
            {recipes !== null && !loading ? (
                recipes.map(recipe => (
                    <li key={recipe._id}>{recipe.name} -- {recipe.details} </li>
                ))
            ) : <Spinner />}
        </Fragment>
    )
}

export default Recipes;
