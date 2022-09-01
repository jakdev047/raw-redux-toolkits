const configureStore = require("@reduxjs/toolkit").configureStore;
// const counterReducer = require("../features/counter/counterSlice");
// const dynamicCounterReducer = require("../features/dynamicCounter/dynamicCounterSlice");
const postReducer = require("../features/post/postSlice");
const singlePostReducer = require("../features/singlePost/singlePostSlice");
// const relatedPostsReducer = require("../features/relatedPosts/relatedPostSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        // counter: counterReducer,
        // dynamicCounter: dynamicCounterReducer,
        // post: postReducer,
        singlePost: singlePostReducer,
        // relatedPosts: relatedPostsReducer,
    },
    // middleware: (getDefaultMiddlewares) =>
    //     getDefaultMiddlewares().concat(logger),
});

module.exports = store;
