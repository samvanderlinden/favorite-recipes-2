import React, { useState, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext'

const RecipeForm = () => {
    const recipesContext = useContext(RecipesContext);

    const { addRecipe } = recipesContext;

    const [recipe, setRecipe] = useState({
        name: '',
        details: ''
    });

    const { name, details } = recipe;

    const onChange = e => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        addRecipe(recipe);

        setRecipe({
            name: '',
            details: ''
        });
    }

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="Recipe Name" name="name" value={name} onChange={onChange} />
            <textarea placeholder="Details here" name="details" value={details} rows="10" cols="10" onChange={onChange} />
            <div>
                <input type="submit" value="Add Contact" />
            </div>
        </form>
    )
}

export default RecipeForm;
