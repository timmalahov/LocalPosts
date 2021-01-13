export const setPostList = (postList) => ({
    type: "SET_POST_LIST",
    payload: postList
});

export const setPostDetails = (postDetails) => ({
    type: "SET_POST_DETAILS",
    payload: postDetails
});

export const getPostList = () => async dispatch => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts?userId=2");
        const postList = await response.json();
        dispatch(setPostList(postList))
    } catch (e) {
        console.error(e)
    }
}
export const getPostDetails = (id) => async dispatch => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${ id }`);
        const postDetails = await response.json();
        dispatch(setPostDetails(postDetails))
    } catch (e) {
        console.error(e)
    }
}

