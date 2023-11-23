import React, { useState } from "react";

import "./css/SavedRecipes.css";

function Saved() {
  //  var bp = require('./Path.js');

  const app_name = "myculinarycompass-0c8901cce626";
  function buildPath(route) {
    if (process.env.NODE_ENV === "production") {
      return "https://" + app_name + ".herokuapp.com/" + route;
    } else {
      return "http://localhost:6001/" + route;
    }
  }
}

export default Saved;
