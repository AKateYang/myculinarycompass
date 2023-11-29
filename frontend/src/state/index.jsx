import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  likes: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    setPost: (state, action) => {
      const updatedPost = action.payload.post;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        state.posts[postIndex] = {
          ...updatedPost,
          comments: updatedPost.comments || [], // ensure comments is always an array
        };
      } else {
        state.posts.push({
          ...updatedPost,
          comments: [], // initialize comments as an empty array
        });
      }
    },
    // setPosts: (state, action) => {
    //   console.log("hi");
    //   state.posts = action.payload.posts;
    //   console.log("hi");
    // },

    setPosts: (state, action) => {
      if (Array.isArray(action.payload?.posts)) {
        // If it's an array, map over the posts to ensure 'comments' are arrays
        state.posts = action.payload.posts.map((post) => ({
          ...post,
          comments: post.comments || [],
        }));
      } else {
        // If 'posts' is not an array, log an error and handle as you see fit
        console.error(
          "setPosts action payload is not an array:",
          action.payload
        );
      }
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  addCommentToPost,
} = authSlice.actions;
export default authSlice.reducer;
