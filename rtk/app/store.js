const configureStore = require("@reduxjs/toolkit").configureStore;
const singlePostReducer = require("../features/singlePost/singlePostSlice");
const { createLogger } = require("redux-logger");

const logger = createLogger();

// configure store
const store = configureStore({
    reducer: {
        singlePost: singlePostReducer,
    },
    // middleware: (getDefaultMiddlewares) =>
    //     getDefaultMiddlewares().concat(logger),
});

module.exports = store;
