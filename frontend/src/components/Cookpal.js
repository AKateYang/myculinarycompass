// Import necessary dependencies and styles
import React, { useState, useEffect } from "react";
import "./css/SavedRecipes.css";
import { useNavigate } from "react-router-dom";
import { WindowSharp } from "@mui/icons-material";

// Define the Cookpal component
const Cookpal = () => {
  // State variables and constants
  const [recipes, setRecipes] = useState([]);
  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);
  var userId = ud.id;
  var userRecipes = ud.saveRecipesId;
  const usersSavedRecipes = [];
  const serverBaseURL = "https://www.myculinarycompass.com/assets/";
  // "https://myculinarycompass-0c8901cce626.herokuapp.com/assets/";
  const navigate = useNavigate();

  // Fetch recipes on component mount
  useEffect(() => {
    // Replace 'API_ENDPOINT' with your actual endpoint URL
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getLazyLoadingRecipes"))
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setRecipes(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Logout function
  const doLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("user_data");
    navigate("/");
  };

  // Navigate to NewsFeed function
  const GoToNewsFeed = (event) => {
    event.preventDefault();
    navigate("/homepage");
  };

  // Function to change button on click
  function changeButton(index, newText, newColor, userId, recipeId) {
    const divsWithKey = document.querySelectorAll(`div[data-key="${index}"]`);
    divsWithKey.forEach((div) => {
      const button = div.querySelector("button");
      if (button) {
        button.addEventListener("click", function () {
          button.textContent = newText;
          button.style.backgroundColor = newColor;

          // Fetch data and update button state
          var bp = require("./Path.js");
          fetch(bp.buildPath("recipes/saveRecipe/" + `${userId}/${recipeId}`), {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Fetched data:", data);
            })
            .catch((error) => console.error("Error fetching data:", error));
        });
      }
    });
  }

  // Function to get saved recipes for a user
  function getSavedRecipes(userId) {
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getUserRecipe/" + `${userId}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        console.log(data.recipes);
        usersSavedRecipes = data.recipes;
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to change button back on click
  function changeButtonBack(index, newText, newColor, userId, recipeId) {
    const groupToHide = document.querySelectorAll(
      `#savedGroup[data-key="${index}"]`
    );
    groupToHide.forEach((div) => {
      const button = div.querySelector("button");
      if (button) {
        button.addEventListener("click", function () {
          console.log(groupToHide[index]);
          const divtoHide = document.querySelector(
            `#savedGroup[data-key="${index}"]`
          );
          divtoHide.style.display = "none";
        });
      }
    });
  }

  // Filter recipes based on saved recipes
  const filteredData = recipes.filter((item) =>
    usersSavedRecipes.includes(item._id)
  );

  // Render the component
  return (
    <div className="cookpal">
      <div className="div">
        <div className="overlap">
          {/* Navigation buttons */}
          <div className="text-wrapper-3">
            <button className="newsfeed-button" onClick={GoToNewsFeed}>
              NewsFeed
            </button>
          </div>
          <div className="overlap-group">
            <button className="logout-button" onClick={doLogout}>
              Log Out
            </button>
          </div>
        </div>
        <div className="overlap-2">
          <div className="overlap-3">
            <div className="overlap-6">
              <div className="get-cooking-bg">
                <p className="get-cooking"></p>
              </div>
            </div>
          </div>
        </div>
        {/* Render suggested recipes */}
        <div className="overlap-8">
          <div className="overlap-9">
            <div className="suggested-recipes-title" id="responsiveDiv">
              Suggested Recipes
            </div>
            {recipes.map((recipe, index) => (
              <div data-key={index} key={index} className="group-2">
                <img
                  className="img"
                  src={`${serverBaseURL}${recipe.picturePath}`}
                  alt={recipe.name}
                />
                <button
                  id="addbutton"
                  className="frame-6-1"
                  onClick={changeButton(
                    index,
                    "Added",
                    "#F05E1633",
                    userId,
                    recipe._id
                  )}
                >
                  Add
                </button>
                <div id="recipeName" className="recipe-name">
                  {recipe.recipeName}
                </div>
                <div className="time-image"></div>
                <div className="time-length">{recipe.timeToMake}</div>
              </div>
            ))}
            {/* Render saved recipes */}
            <div className="saved-recipes-title"></div>
            {filteredData.map((recipe, index) => (
              <div
                data-key={index}
                key={index}
                className="group-2"
                id="savedGroup"
              >
                <img
                  className="img"
                  src={`${serverBaseURL}${recipe.picturePath}`}
                  alt={recipe.name}
                />
                <button
                  id="addbutton"
                  className="frame-6-1-1"
                  onClick={changeButtonBack(
                    index,
                    "Add",
                    "#078e1433",
                    userId,
                    recipe._id
                  )}
                >
                  Added
                </button>
                <div id="recipeName" className="recipe-name">
                  {recipe.recipeName}
                </div>
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

// Export the Cookpal component
export default Cookpal;
