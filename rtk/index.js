const store = require("./app/store");
const { fetchPost } = require("./features/singlePost/singlePostSlice");

// subscribe to state changes
store.subscribe(() => {
    console.log("data",JSON.stringify(store.getState(),null,2));
});

// disptach actions
store.dispatch(fetchPost(4));
