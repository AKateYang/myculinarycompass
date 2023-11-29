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
    // Merge the logic of both setPost reducers here
    setPost: (state, action) => {
      const updatedPost = action.payload.post;
      const postIndex = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIndex !== -1) {
        // Replace the post with the updated one from the action payload
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

    // Add the missing setPosts reducer
    setPosts: (state, action) => {
      state.posts = action.payload.posts.map((post) => ({
        ...post,
        comments: post.comments || [], // ensure comments is always an array
      }));
    },
  },
});

// export const store = configureStore({
//   reducer: {
//     auth: authSlice.reducer,
//   },
// });

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
