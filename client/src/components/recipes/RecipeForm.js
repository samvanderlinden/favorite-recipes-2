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
        <div id="add-recipe-modal" className="modal">
            <div className="modal-content">
                    <input type="text" placeholder="Recipe Name" name="name" value={name} onChange={onChange} />
                    <textarea placeholder="Details here" name="details" value={details} rows="10" cols="10" onChange={onChange} />
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn blue">Add Recipe</a>
            </div>
        </div>
    )
}

export default RecipeForm;
