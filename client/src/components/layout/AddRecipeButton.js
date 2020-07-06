import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddRecipeButton = () => {
    useEffect(() => {
        let addRecipeModal = document.querySelector('#add-recipe-modal');
        M.Modal.init(addRecipeModal, {});
    });
    return (
        <div className="fixed-action-btn">
            <a href="#add-recipe-modal" className="btn-floating btn-large blue modal-trigger">
                <i className="large material-icons">add</i>
            </a>
        </div>
    )
}

export default AddRecipeButton
