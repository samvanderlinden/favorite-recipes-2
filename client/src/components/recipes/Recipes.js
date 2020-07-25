import React, { Fragment, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../App.css';

const Recipes = () => {
    const recipesContext = useContext(RecipesContext);

    const { recipes, getRecipes, loading, filtered } = recipesContext;

    useEffect(() => {
        getRecipes();
        // eslint-disable-next-line
    }, []);

    if (recipes !== null && recipes.length === 0 && !loading) {
        return <h4 className="please-add-recipe">Please add a recipe</h4>
    }

    return (
        <Fragment>
            { recipes !== null && !loading ? (<TransitionGroup>
                {filtered !== null ? filtered.map(recipe => (
                    <CSSTransition key={recipe._id} timeout={500} classNames="item">
                        <RecipeItem recipe={recipe} />
                    </CSSTransition>
                )) : 
                    (recipes.map(recipe => (
                    <CSSTransition key={recipe._id} timeout={500} classNames="item">
                        <RecipeItem recipe={recipe} />
                    </CSSTransition>
                )))}    
            </TransitionGroup>) : <Spinner /> }
        </Fragment>
    )
}

export default Recipes;
