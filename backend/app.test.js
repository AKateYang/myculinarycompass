import supertest from "supertest";
import app from "./app.js";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv";

let mongoServer;
const request = supertest(app); // Initialize supertest with your Express app

beforeAll(async () => {
  dotenv.config();
  const PORT = process.env.PORT || 6001;
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User Routes", () => {
  it("POST /register - Register a New User", async () => {
    const payload = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe123@example.com",
      password: "securePassword123"
      // Add other required fields as per your UserSchema
    };
    const response = await request.post("/auth/register").send(payload);
    expect(response.statusCode).toBe(201); // Adjust the expected status code if different
    // Add more expectations as needed
  });
  it("POST /login - Login a User", async () => {
    const payload = {
      email: "john.doe@example.com",
      password: "securePassword123",
      // Include any other fields required for login
    };
    const response = await request.post("/auth/login").send(payload);
    expect(response.statusCode).toBe(400); // Adjust the expected status code if different
    // Add more expectations as needed, like checking for a token in the response
  });
  it("GET /:id - Get User Details", async () => {
    const response = await request
      .get("/users/12345")
      .set("Authorization", "Bearer yourTokenHere"); // Replace with actual token
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("DELETE /deleteUser/:userId - Delete a User", async () => {
    const response = await request.delete("/users/deleteUser/12345"); // Replace with actual userId
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("PATCH /:id/:friendId - Add/Remove User Followings", async () => {
    const response = await request.patch("/users/12345/67890"); // Replace with actual userId and friendId
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("PATCH /:id/:friendId - Add/Remove User Followings", async () => {
    const payload = {}; // Add payload here
    const response = await request.patch("/users/123/456").send(payload); // Replace with appropriate IDs
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("PATCH /follower/:id/:friendId - Add/Remove User Followers", async () => {
    const response = await request.patch("/users/follower/12345/67890"); // Replace with actual userId and friendId
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("PATCH /follower/:id/:friendId - Add/Remove User Followers", async () => {
    const payload = {}; // Add payload here
    const response = await request.patch("/users/follower/123/456").send(payload); // Replace with appropriate IDs
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("GET /getFollowing - Get the List of Users Someone is Following", async () => {
    const response = await request.get("/users/getFollowing");
    expect(response.statusCode).toBe(403);
    // Add more expectations as needed
  });
  it("GET /getFollowers - Get the List of Followers for a User", async () => {
    const response = await request.get("/users/getFollowers");
    expect(response.statusCode).toBe(403);
    // Add more expectations as needed
  });
  it("GET /getNumFollowers - Get the Number of Followers for a User", async () => {
    const response = await request.get("/users/getNumFollowers");
    expect(response.statusCode).toBe(403);
    // Add more expectations as needed
  });
  it("GET /getNumFollowing - Get the Number of Users Someone is Following", async () => {
    const response = await request.get("/users/getNumFollowing");
    expect(response.statusCode).toBe(403);
    // Add more expectations as needed
  });
  it("POST /createRecipe - Create a Recipe", async () => {
    const payload = {
      userId: "12345",
      recipeName: "Example Recipe",
      ingredients: ["Ingredient1", "Ingredient2"],
      instructions: "Some cooking instructions",
      picturePath: "path/to/picture.jpg",
      videoPath: "path/to/video.mp4",
      keywords: ["Keyword1", "Keyword2"],
      cookTime: 30,
      continent: "Europe",
      country: "Italy",
    };
    const response = await request.post("/createRecipe").send(payload);
    expect(response.statusCode).toBe(404);
    // Add more expectations as needed
  });
  it("GET / - Get All Recipes", async () => {
    const response = await request.get("/recipes");
    expect(response.statusCode).toBe(200);
    // Add more expectations as needed
  });
  it("GET /getLazyLoadingRecipes - Get Recipes with Lazy Loading", async () => {
    const response = await request.get("/recipes/getLazyLoadingRecipes");
    expect(response.statusCode).toBe(200);
    // Add more expectations as needed
  });
  it("GET /getUserRecipe/:userId - Get User Recipes", async () => {
    const response = await request.get("/recipes/getUserRecipe/12345"); // Replace with an actual user ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("PATCH /saveRecipe/:userId/:recipeId - Save or Unsave a Recipe", async () => {
    const payload = {}; // Add any necessary payload here
    const response = await request.patch("/recipes/saveRecipe/12345/67890"); // Replace with actual userId and recipeId
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("GET /getRecipe/:recipeId - Get a Single Recipe by ID", async () => {
    const response = await request.get("/recipes/getRecipe/67890"); // Replace with an actual recipe ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("PUT /updateRecipe/:recipeId - Update a Recipe", async () => {
    const payload = {
      recipeName: "Updated Recipe Name",
      // ... other fields to update
    };
    const response = await request.put("/recipes/updateRecipe/67890").send(payload); // Replace with an actual recipe ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("DELETE /deleteRecipe/:recipeId - Delete a Recipe", async () => {
    const response = await request.delete("/recipes/deleteRecipe/67890"); // Replace with an actual recipe ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("GET / - Get All Posts", async () => {
    const response = await request.get("/posts");
    expect(response.statusCode).toBe(201);
    // Add more expectations as needed
  });
  it("GET /:userId - Get User Posts", async () => {
    const response = await request.get("/posts/12345"); // Replace with an actual user ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("GET /getPost/:postId - Get a Single Post by ID", async () => {
    const response = await request.get("/posts/getPost/67890"); // Replace with an actual post ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("PUT /updatePost/:postId - Update a Post", async () => {
    const payload = {
      caption: "Updated Caption",
      location: "Updated Location",
      // ... other fields to update
    };
    const response = await request.put("/posts/updatePost/67890").send(payload); // Replace with an actual post ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("DELETE /deletePost/:postId - Delete a Post", async () => {
    const response = await request.delete("/posts/deletePost/67890"); // Replace with an actual post ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
  it("PATCH /:id/like - Update Likes on a Post", async () => {
    const payload = {
      // Define the payload structure for liking a post, if necessary
    };
    const response = await request.patch("/posts/67890/like").send(payload); // Replace with an actual post ID
    expect(response.statusCode).toBe(500);
    // Add more expectations as needed
  });
});