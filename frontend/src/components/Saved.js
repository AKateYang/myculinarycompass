import React, { useState } from "react";

<<<<<<< HEAD
import "./css/SavedRecipes.css";
=======
import "../css/SavedRecipes.css";
>>>>>>> master

function Saved() {
  //  var bp = require('./Path.js');

  const app_name = "myculinarycompass-0c8901cce626";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:5000/" + route;
    }
  }
<<<<<<< HEAD
}

export default Saved;
=======

  
}

export default Saved;
>>>>>>> master
