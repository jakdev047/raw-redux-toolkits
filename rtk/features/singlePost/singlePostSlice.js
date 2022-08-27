const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");
const { fetchRelatedPosts } = require("../relatedPosts/relatedPostSlice");

// initial state
const initialState = {
    loading: false,
    singlePost: "",
    relatedPosts: [],
    error: "",
};

// create async thunk
const fetchPost = createAsyncThunk("post/fetchPost", async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post = await response.json();

    return post;
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
            state.singlePost = action.payload;
        });

        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.singlePost = "";
        });

        // related posts
        builder.addCase(fetchRelatedPosts.pending, (state, action) => {
            state.loading = true;
            state.error = "";
        });

        builder.addCase(fetchRelatedPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.error = "";
            state.relatedPosts = action.payload;
        });

        builder.addCase(fetchRelatedPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
            state.relatedPosts = [];
        });

    },
});

module.exports = singlePostSlice.reducer;
module.exports.fetchPost = fetchPost;
