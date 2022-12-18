import { Link } from "react-router-dom";
import "../pages/MyListOfRecipesPage.css";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function BasketCard({ recipe}){
  
    const removeRecipe = () => {
        localStorage.removeItem(recipe.title);
        const oldPrice = JSON.parse(localStorage.getItem("price"));
        localStorage.setItem("price", JSON.stringify(oldPrice - recipe.price));
    
        window.dispatchEvent(new Event('storage'));
    }

    const updateRecipe = (e) => {
        if(e.target.value === ""){
            return;
        }
        let newRecipe = JSON.parse(localStorage.getItem(recipe.title));
      
        newRecipe.servingCount  = e.target.valueAsNumber;
        newRecipe.price =  recipe.price / recipe.servingCount  * e.target.valueAsNumber;
        newRecipe.ingredients = recipe.ingredients.map(ingredient => {
            return {...ingredient,
                 amount: ingredient.amount / recipe.servingCount  * e.target.valueAsNumber,
                 price: ingredient.price / recipe.servingCount  * e.target.valueAsNumber}
            });
        localStorage.setItem(newRecipe.title, JSON.stringify(newRecipe));

        const oldPrice = JSON.parse(localStorage.getItem("price"));
        localStorage.setItem("price", JSON.stringify(oldPrice - recipe.price + newRecipe.price));
        window.dispatchEvent(new Event('storage'));
    }

    return (
        <div className="BasketCard">
            <Link to={`/recipes/${recipe.slug}`} >
                <h3>{recipe.title}</h3>
            </Link>
            <div className="Basket-information">
                <input type="number" min="1" max="99" value={recipe.servingCount} onChange={updateRecipe} ></input>
                <p>{Number(recipe.price).toFixed(2)}  &euro;</p>
                <button onClick={removeRecipe}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
        </div>
    );
}