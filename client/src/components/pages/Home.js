import React, { useContext, useEffect } from 'react'
import Recipes from '../recipes/Recipes';
import RecipeForm from '../recipes/RecipeForm';
import AuthContext from '../../context/auth/authContext';
import RecipesContext from '../../context/recipes/recipesContext';
import AddRecipeButton from '../layout/AddRecipeButton';
import SearchRecipes from '../recipes/SearchRecipes';

const Home = () => {
    const authContext = useContext(AuthContext);
    const recipeContext = useContext(RecipesContext);

    const { recipes } = recipeContext;

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="grid-2">
            <div>
                <RecipeForm />
                <AddRecipeButton />
            </div>
            <div>
                { recipes.length > 0 && <SearchRecipes /> }
                <Recipes />
            </div>
        </div>
    )
}

export default Home;
