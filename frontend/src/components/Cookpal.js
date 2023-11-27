import React, { useState, useEffect } from "react";
import "./css/SavedRecipes.css";
import { useNavigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

const Cookpal = () => {

  const [recipes, setRecipes] = useState([]);
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var userRecipes = ud.saveRecipesId;
  const usersSavedRecipes = [];
  const serverBaseURL = "https://myculinarycompass-0c8901cce626.herokuapp.com/assets/";

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
      //const navigate = useNavigate();

        localStorage.removeItem("user_data")
        //navigate("/");
        window.location.href('/');

    };

    // const goToNewsFeed = event =>
    // {
    //   event.preventDefault();
    //   const navigate = useNavigate();

    //   navigate("/homepage");
    // }

  
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

  function getSavedRecipes (userId) {
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getUserRecipe/" + `${userId}`), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      // If you need to send a body with the POST request, add it here
      // body: JSON.stringify({ /* data */ })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data);
      console.log(data.recipes);
      usersSavedRecipes = data.recipes;
    })
    .catch(error => console.error('Error fetching data:', error));
  }

  function changeButtonBack(index, newText, newColor, userId, recipeId)
  {   
      const groupToHide = document.querySelectorAll(`#savedGroup[data-key="${index}"]`);
      groupToHide.forEach(div => {
        const button = div.querySelector('button'); // Get the button inside the div
        if (button) {
          button.addEventListener('click', function() {
            console.log(groupToHide[index]);
            const divtoHide = document.querySelector(`#savedGroup[data-key="${index}"]`);
            divtoHide.style.display = 'none';
          });
        }
    });
  };
  
  //console.log("saved recipes" + getSavedRecipes(userId));
  
  console.log("users saved recipes" + usersSavedRecipes[0]);
  const filteredData = recipes.filter(item => usersSavedRecipes.includes(item._id));
  //console.log("all recipes" + recipes);
  //console.log("filtered data: " + filteredData);


    return (
        <div className="cookpal">
      <div className="div">
        <div className="overlap">
          {/* <div className="text-wrapper">
            <button className="logout-button" >Saved Recipes</button>
          </div>
          <div className="text-wrapper-2">
            <button className="logout-button" >My Recipes</button>
          </div> */}
          <div className="text-wrapper-3">
            <button className="logout-button" >NewsFeed</button>
          </div>
          <div className="overlap-group">
              <button className="logout-button" onClick={doLogout}>Log Out</button>
          </div>
        </div>
        <div className="overlap-2">
          <div className="overlap-3">
            {/* <div className="culinary-compass">
              <span className="span">
                Culinary
                <br />
              </span>
              <span className="text-wrapper-6">Compass</span>
            </div> */}
            {/* <div className="overlap-4">
              {/* <div className="text-wrapper-8">
                {/* <label for="textInput">Search: </label> }
                <input type="text" border="none" name="textInput"></input>
              </div> }
              <div className="overlap-5">
                <img className="text-wrapper-9" />
              </div>
            </div> */}
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
          <div className="suggested-recipes-title" id="responsiveDiv">Suggested Recipes</div>
              {recipes.map((recipe, index) => (
                  <div data-key={index} key={index} className="group-2">
                    <img className="img" src={`${serverBaseURL}${recipe.picturePath}`} alt={recipe.name} />
                    <button id="addbutton" className="frame-6-1" onClick={changeButton(index, "Added", "#F05E1633", userId, recipe._id)}>Add</button>
                    <div id="recipeName" className="recipe-name">{recipe.recipeName}</div>
                    <div className="time-image"></div>
                    <div className="time-length">{recipe.timeToMake}</div>
                    <div className="recipe-likes-img" />
                    <div className="comments-img" />
                    <div className="recipe-likes">{recipe.likes}</div>
                    <div className="recipe-comments">{recipe.comments}</div>
                  </div>
              ))}
            <div className="saved-recipes-title"></div>
            {filteredData.map((recipe, index) => (
                  <div data-key={index} key={index} className="group-2" id="savedGroup">
                    <img className="img" src={`${serverBaseURL}${recipe.picturePath}`} alt={recipe.name} />
                    <button id="addbutton" className="frame-6-1-1" onClick={changeButtonBack(index, "Add", "#078e1433", userId, recipe._id)}>Added</button>
                    <div id="recipeName" className="recipe-name">{recipe.recipeName}</div>
                    <div className="time-image"></div>
                    <div className="time-length">{recipe.timeToMake}</div>
                    <div className="recipe-likes-img" />
                    <div className="comments-img" />
                    <div className="recipe-likes">{recipe.likes}</div>
                    <div className="recipe-comments">{recipe.comments}</div>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
    
    );
  };

  export default Cookpal;
