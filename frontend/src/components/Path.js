// const app_name = "myculinarycompass-0c8901cce626";
const app_name = "www.myculinarycompass";
exports.buildPath = function buildPath(route) {
  if (process.env.NODE_ENV === "production") {
    // return "http://" + app_name + ".herokuapp.com/" + route;
    return "http://" + app_name + ".com/" + route;
  } else {
    // Change to 5000 for main server
    return "http://localhost:6001/" + route;
  }
};
