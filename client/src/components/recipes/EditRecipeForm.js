import React, { useState, useContext } from 'react';
import RecipesContext from '../../context/recipes/recipesContext'

const EditRecipeForm = ({recipeItem}) => {
    const recipesContext = useContext(RecipesContext);

    const { updateRecipe } = recipesContext;

    const [recipe, setRecipe] = useState({
        _id: recipeItem._id,
        name: recipeItem.name,
        details: recipeItem.details
    });

    const { name, details } = recipe;

    const onChange = e => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        updateRecipe(recipe);

    }

    return (
        <div id="update-recipe-modal" className="modal">
            <div className="modal-content input-field">
                    <input type="text" placeholder="Recipe Name" name="name" value={name} onChange={onChange} />
                    <textarea placeholder="Recipe Details" className="materialize-textarea" name="details" value={details} onChange={onChange}/>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn blue">Edit Recipe</a>
            </div>
        </div>
    )
}

export default EditRecipeForm;
