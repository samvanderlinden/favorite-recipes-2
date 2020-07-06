import React from 'react'

const AddRecipeButton = () => {
    return (
        <div className="fixed-action-btn">
            <a href="#add-recipe-modal" className="btn-floating btn-large blue modal-trigger">
                <i className="large material-icons">add</i>
            </a>
        </div>
    )
}

export default AddRecipeButton
