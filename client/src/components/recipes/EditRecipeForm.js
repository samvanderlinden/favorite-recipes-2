import React, { useState, useContext, useEffect } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditRecipeForm = () => {
    const [recipe, setRecipe] = useState({ name: '', details: '' });

    const recipesContext = useContext(RecipesContext);

    const { updateRecipe, current } = recipesContext;

    console.log('current',current);

    useEffect(() => {
        if (current) {
            setRecipe({name: current.name, details: current.details});
        }
    }, [current]);

    const onChange = e => {
        setRecipe({ ...recipe, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();

        if (recipe.name === '' || recipe.details === '') {
            M.toast({html: 'Please fill in a recipe name and details'});
        } else {
            const newRecipe = {
                _id:current._id,
                name: recipe.name,
                details: recipe.details
            }

            updateRecipe(newRecipe);
        }

    }

    return (
        <div id="update-recipe-modal" className="modal">
            <div className="modal-content input-field">
                    <input type="text" placeholder="Recipe Name" name="name" value={recipe.name} onChange={onChange} />
                    <textarea placeholder="Recipe Details" className="materialize-textarea" name="details" value={recipe.details} onChange={onChange}/>
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={onSubmit} className="modal-close waves-effect waves-light btn blue">Edit Recipe</a>
            </div>
        </div>
    )
}

export default EditRecipeForm;
