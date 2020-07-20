import React, { useContext, useEffect, Fragment } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import EditRecipeForm from './EditRecipeForm';
import M from 'materialize-css/dist/js/materialize.min.js';
import '../../App.css';

const RecipeItem = ({ recipe }) => {
    useEffect(() => {
        let updateRecipeModal = document.querySelector('#update-recipe-modal');
        M.Modal.init(updateRecipeModal, {});
    });

    const recipesContext = useContext(RecipesContext);

    const { deleteRecipe } = recipesContext;

    const { _id, name, details } = recipe;

    const onDelete = () => {
        deleteRecipe(_id);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card grey lighten-5">
                        <div className="card-content black-text">
                            <span className="card-title">{name}</span>
                            <p>{details}</p>
                        </div>
                        <div className="card-action card-btn-container">
                            <a className="btn-floating waves-effect red" onClick={onDelete}><i className="material-icons">delete</i></a>
                            <a className="btn-floating waves-effect #558b2f light-green darken-3 modal-trigger" href="#update-recipe-modal"><i className="material-icons">create</i></a>
                        </div>
                    </div>
                </div>
            </div>
            <EditRecipeForm 
            recipeItem={recipe}/>
        </Fragment>
    )
}

export default RecipeItem
