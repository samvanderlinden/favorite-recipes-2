import React, { useRef, useEffect, useContext } from 'react';
import RecipesContext from '../../context/recipes/recipesContext';

const SearchRecipes = () => {
    const recipesContext = useContext(RecipesContext);

    const { filtered, filterRecipes, clearFilter } = recipesContext;

    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    })

    const onSearchChange = (e) => {
        if(text.current.value !== '') {
            filterRecipes(e.target.value)
        } else {
            clearFilter();
        }
    }

    return (
        <div className="row search-component">
            <form className="col s12">
                <div className="row">
                    <div className="input-field">
                        <i className="material-icons prefix">search</i>
                        <input id="icon_prefix" type="text" ref={text} onChange={onSearchChange}/>
                            <label htmlFor="icon_prefix">Search Recipes</label>
                    </div>
                </div>
            </form>
        </div>
 
    )
}

export default SearchRecipes
