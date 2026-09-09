import React, { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography";
import recipes from "../recent-recipe";
import { AccessAlarm, LocalFireDepartmentOutlined, LunchDiningOutlined, Star } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite'
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';



function RecipeCards() {

    const [expandedCard, setExpandedCard ] = useState(null)

    function handleClick(id) {
        setExpandedCard((prevId) =>
    prevId === id ? null : id
  );
    }

        return <div className="cards-container">
                { recipes.meals.map((recipe, index) => {
                    return(<Card 
                        key={recipe.idMeal}
                        id={recipe.idMeal}
                        sx={{
                            width: 260,
                            minHeight: 370,
                            borderRadius: 3,
                            boxShadow: 3
                        }}>
                        <CardMedia component='img' height="208" image={recipe.strMealThumb} />
                        <CardContent onClick={() => handleClick(recipe.idMeal)} className="card-content">
                            <Typography variant="h6" sx={{fontWeight: 'bold', width: "100%", whiteSpace:expandedCard === recipe.idMeal ? "normal" : "nowrap", overflow: 'hidden', textOverflow: 'ellipsis'}}>{recipe.strMeal}</Typography>
                            <div className="recipe-info">
                               <div><AccessAlarm color="disabled" sx={{ fontSize: 18}}/> <Typography variant="body2" sx={{color: 'text.secondary'}}>35mins</Typography> </div>
                               <div><LunchDiningOutlined color="disabled" sx={{ fontSize: 18 }}/> <Typography variant="body2" sx={{color: 'text.secondary'}}>7items</Typography></div>
                               <div><LocalFireDepartmentOutlined color="disabled" sx={{ fontSize: 18 }}/><Typography variant="body2" sx={{color: 'text.secondary'}}>130 cal</Typography></div>
                            </div>
                            <div className="recipe-button">
                                <button className="btn">
                                    Cook Now
                                    {/* <KeyboardDoubleArrowRightIcon /> */}
                                </button>
                                <CardActions>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                        </IconButton>
                                </CardActions>
                                <div className="rating">
                                    <Star /> <h4>5.0</h4>
                                </div>
                            </div>
                            </CardContent>
                    </Card>)
                })
                
}
            </div>
}

export default RecipeCards