import React, { useContext, useEffect } from 'react'
import Recipes from '../recipes/Recipes';
import RecipeForm from '../recipes/RecipeForm';
import AuthContext from '../../context/auth/authContext';
import AddRecipeButton from '../layout/AddRecipeButton';
import SearchRecipes from '../recipes/SearchRecipes';

const Home = () => {
    const authContext = useContext(AuthContext);

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
                <SearchRecipes />
                <Recipes />
            </div>
        </div>
    )
}

export default Home;
