import React, { useState, useEffect } from "react";
import "./css/SavedRecipes.css";

const Cookpal = () => {

  const [recipes, setRecipes] = useState([]);
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;

  useEffect(() => {
    // Replace 'API_ENDPOINT' with your actual endpoint URL
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getLazyLoadingRecipes"))
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data);  // This line logs the fetched data
        setRecipes(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // const handleSaveorUnsave = async () => {
  //   try {
  //     var bp = require("./Path.js");
  //     fetch(bp.buildPath("recipes/saveAndUnsaveRecipes"))
  //       .then(response => response.json())
  //       .then(data => {
  //         console.log('Fetched data:', data);
  //       })
  //     const updatedRecipe = await response.json();
  //     console.log('Updated Recipe:', updatedRecipe);
  //   } catch (error) {
  //     console.error('There was a proble:', error);
  //   }
  // };
  
  // useEffect(() => {
  //   // Replace 'API_ENDPOINT' with your actual endpoint URL
  //   var bp = require("./Path.js");
  //   fetch(bp.buildPath("recipes/saveRecipe/:userId/:recipeId"))
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Fetched data:', data);  // This line logs the fetched data
  //       setRecipes(data);
  //     })
  //     .catch(error => console.error('Error fetching data:', error));
  // }, []);

  const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

    };

  function changeButton(index, newText, newColor, userId, recipeId)
  {
    const divsWithKey = document.querySelectorAll(`div[data-key="${index}"]`);

    divsWithKey.forEach(div => {
      const button = div.querySelector('button'); // Get the button inside the div

      if (button) {
        button.addEventListener('click', function() {
            button.textContent = newText;
            button.style.backgroundColor = newColor;
            //saveRecipe(userId, recipeId);
            var bp = require("./Path.js");
            fetch(bp.buildPath("recipes/saveRecipe/" + `${userId}/${recipeId}`), {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              // If you need to send a body with the POST request, add it here
              // body: JSON.stringify({ /* data */ })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Fetched data:', data);
            })
            .catch(error => console.error('Error fetching data:', error));
        });
      }
    });
  };

  // function getPicture(index)
  // {
  //   const divsWithKey = document.querySelectorAll(`div[data-key="${index}"]`);

  //   divsWithKey.forEach(div => {
  //     const img = div.querySelector('img'); // Get the button inside the div

  //     if (img) {
  //       const picturePath = "./images/food-" + (index + 1) + ".jpeg";
  //       console.log(picturePath);
  //       return picturePath;
  //     }
  //   });
  // };

    return (
        <div className="cookpal">
      <div className="div">
        <div className="overlap">
          <div className="text-wrapper">
            <button className="logout-button" >Saved Recipes</button>
          </div>
          <div className="text-wrapper-2">
            <button className="logout-button" >My Recipes</button>
          </div>
          <div className="text-wrapper-3">
            <button className="logout-button" >NewsFeed</button>
          </div>
          <div className="overlap-group">
              <button className="logout-button" onClick={doLogout}>Log Out</button>
          </div>
        </div>
        <div className="overlap-2">
          <div className="overlap-3">
            <div className="culinary-compass">
              <span className="span">
                Culinary
                <br />
              </span>
              <span className="text-wrapper-6">Compass</span>
            </div>
            <div className="overlap-4">
              <div className="text-wrapper-8">
                {/* <label for="textInput">Search: </label> */}
                <input type="text" border="none" name="textInput"></input>
              </div>
              <div className="overlap-5">
                <img className="text-wrapper-9" />
              </div>
            </div>
            <div className="overlap-6">
              <div className="get-cooking-bg">
                <p className="get-cooking">
                  <span className="text-wrapper-11">Get&nbsp;&nbsp;</span>
                  <span className="text-wrapper-12">Cooking!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="overlap-8">
          <div className="overlap-9">
          <div className="suggested-recipes-title">Suggested Recipes</div>
              {recipes.map((recipe, index) => (
                  <div data-key={index} key={index} className="group-2">
                    <img className="img" src="./images/food-1.jpeg" alt={recipe.name} />
                    <button id="addbutton" className="frame-6-1" onClick={changeButton(index, "Added", "#F05E1633", userId, recipe._id)}>Add</button>
                    <div id="recipeName" className="recipe-name">{recipe.recipeName}</div>
                    <div className="time-image"></div>
                    <div className="time-length">{recipe.time}</div>
                    <div className="recipe-likes-img" />
                    <div className="comments-img" />
                    <div className="recipe-likes">{recipe.likes}</div>
                    <div className="recipe-comments">{recipe.comments}</div>
                  </div>
              ))}
            {/* <div className="group-3">
              <div className="text-wrapper-32">FILTERS</div>
              <div className="text-wrapper-33">Diet</div>
              <div className="filter-group">
                <button className="filter-button">Dairy Free</button>
                <button className="filter-button">Egg Free</button>
                <button className="filter-button">Sugar Free</button>
                <button className="filter-button">Gluten Free</button>
              </div>
              <div className="text-wrapper-33-1">Allergies</div>
              <div className="filter-group">
                <button className="filter-button">Nuts</button>
                <button className="filter-button">Legumes</button>
                <button className="filter-button">Grain</button>
                <button className="filter-button">Fruit</button>
              </div>
              <div className="text-wrapper-34">Cusine</div>
              <div className="filter-group">
                <button className="filter-button">Asian</button>
                <button className="filter-button">Italian</button>
                <button className="filter-button">Chinese</button>
                <button className="filter-button">Thai</button>
              </div>  
            </div> */}
            <div className="saved-recipes-title">Saved Recipes</div>
          </div>
        </div>
      </div>
    </div>
    
    );
  };

  export default Cookpal;