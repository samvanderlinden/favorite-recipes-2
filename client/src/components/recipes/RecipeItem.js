import React, { useContext, useEffect, Fragment } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';
import '../../App.css';

const RecipeItem = ({ recipe }) => {
    const recipesContext = useContext(RecipesContext);

    const { deleteRecipe, setCurrent } = recipesContext;

    const { _id, name, details } = recipe;

    const onDelete = () => {
        deleteRecipe(_id);
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col s12 m6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{name}</span>
                            <p>{details}</p>
                        </div>
                        <div className="card-action card-btn-container">
                            <a className="btn-floating waves-effect red" onClick={onDelete}><i className="material-icons">delete</i></a>
                            <a href="#update-recipe-modal" className="btn-floating waves-effect amber lighten-1 modal-trigger" onClick={() => setCurrent(recipe)}><i className="material-icons">create</i></a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RecipeItem
