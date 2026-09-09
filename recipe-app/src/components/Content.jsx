import React from "react";
import '../index.css'
import Button from '@mui/material/Button';
import RecipeCards from "./RecipeCards";


function Content(params) {
    const category = ["beef", "chicken", "pork", "breakfast", "pasta", "Dessert"]
    return (
        <div className="container">
            <form>
            <label className="search-label">What's on your mind today ?</label>
            <input name="search" placeholder="search.."/>
            </form>

            <div className="options-buttons">
                {category.map((item, index) => {
                    return <button>{item}</button>
                })}
            </div>
            <div>
                <h2>Latest Recipes</h2>
                <RecipeCards />
            </div>
        
            


        </div>
    )
}

export default Content;