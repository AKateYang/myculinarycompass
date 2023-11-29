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
  let holdSavedData;
  let holdBuildData;
  let filteredData;

  //const usersSavedRecipes = [];
  const serverBaseURL = "https://www.myculinarycompass.com/assets/";
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
        getSavedRecipes(userId);
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
    const groupToShow = document.querySelectorAll(
      `#savedGroup[data-key="${index}"]`
    );

    divsWithKey.forEach((div) => {
      const button = div.querySelector("button");
      if (button) {
        button.addEventListener("click", function () {
          button.textContent = newText;
          button.style.backgroundColor = newColor;

          groupToShow.forEach((div) => {
            const button = div.querySelector("button");
            if (button) {
              console.log(groupToShow[index]);
              const divtoHide = document.querySelector(
                `#savedGroup[data-key="${index}"]`
              );
              divtoHide.style.display = "block";
            }
          });

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
              console.log("Fetched data inside changebutton:", data);
              getSavedRecipes(userId);
            })
            .catch((error) => console.error("Error fetching data:", error));
        });
      }
    });
  }

  // Function to get saved recipes for a user
  async function getSavedRecipes(userId) {
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getUserRecipe/" + `${userId}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data inside getsavedrecipes:", data);
        console.log("data.recipes[0]:" + data.recipes[0]);
        holdSavedData = data.recipes;
        console.log(holdSavedData);
        filteredData = recipes.filter((item) =>
          holdSavedData.includes(item._id)
        );
        console.log("recipes ?" + recipes);
        buildSavedRecipe(data.recipes[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  async function buildSavedRecipe(recipeId) {
    var bp = require("./Path.js");
    fetch(bp.buildPath("recipes/getRecipe/" + `${recipeId}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data inside singlerecipe " + data.timeToMake);
        holdBuildData = data;
        console.log("hold build data in buuld funct " + holdBuildData);
        console.log("testing hold recipes plzplzplz: " + holdSavedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  // Function to change button back on click
  function changeButtonBack(index, newText, newColor, userId, recipeId) {
    const groupToHide = document.querySelectorAll(
      `#savedGroup[data-key="${index}"]`
    );

    const divsWithKey = document.querySelectorAll(`div[data-key="${index}"]`);

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
            <div className="saved-recipes-title">Saved Recipes</div>
            <div id="saved-recipes" />
            {recipes.map((recipe, index) => (
              <div
                data-key={index}
                key={index}
                className="group-2-1"
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
