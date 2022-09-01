const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
  loading: false,
  singlePost: "",
  relatedPosts: [],
  error: "",
};

// create async thunk
const fetchPost = createAsyncThunk("singlePost/fetchPost", async (id) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const post = await response.json();

  // related posts
  const postTitleArr = post.title.split(" ");
  const limit = 5;
  let queryString =
    postTitleArr?.length > 0
      ? postTitleArr.map((title) => `title_like=${title}`).join("&") +
        `&id_ne=${id}&_limit=${limit}`
      : `id_ne=${id}&_limit=${limit}`;

  const resRelatedPosts = await fetch(
    `https://jsonplaceholder.typicode.com/posts?${queryString}`
  );

  const relatedPosts = await resRelatedPosts.json();

  return { post, relatedPosts };
});

const singlePostSlice = createSlice({
  name: "singlePost",
  initialState,
  extraReducers: (builder) => {
    // single post
    builder.addCase(fetchPost.pending, (state, action) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.singlePost = action.payload.post;
      state.relatedPosts = action.payload.relatedPosts;
    });

    builder.addCase(fetchPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.singlePost = "";
      state.relatedPosts= [];
    });
  },
});

module.exports = singlePostSlice.reducer;
module.exports.fetchPost = fetchPost;
