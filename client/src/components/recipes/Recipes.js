import React, { Fragment, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/Spinner';
import '../../App.css';

const Recipes = () => {
    const recipesContext = useContext(RecipesContext);

    const { recipes, getRecipes, loading } = recipesContext;

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    if (recipes !== null && recipes.length === 0 && !loading) {
        return <h4 className="please-add-recipe">Please add a recipe</h4>
    }

    return (
        <Fragment>
            {recipes !== null && !loading ? (
                recipes.map(recipe => (
                    <RecipeItem
                        recipe={recipe}
                        key={recipe._id} />
                ))
            ) : <Spinner />}
        </Fragment>
    )
}

export default Recipes;
