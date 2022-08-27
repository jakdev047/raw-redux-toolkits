const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require("node-fetch");

// initial state
const initialState = {
    loading: false,
    relatedPosts: [],
    error: "",
};

// create async thunk
const fetchRelatedPosts = createAsyncThunk("relatedPosts/fetchRelatedPosts", async () => {
    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=1"
    );
    const relatedPosts = await response.json();

    return relatedPosts;
});

const relatedPostslice = createSlice({
    name: "relatedPosts",
    initialState,
    extraReducers: (builder) => {
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

module.exports = relatedPostslice.reducer;
module.exports.fetchRelatedPosts = fetchRelatedPosts;
