const initialState = {
    postList: [],
    postDetails: {}
};

export const posts = (state = initialState, action) => {
    switch (action.type) {
        case "SET_POST_LIST":
            return Object.assign({}, state, { postList: action.payload });
        case "SET_POST_DETAILS":
            return Object.assign({}, state, { postDetails: action.payload });
        default:
            return state;
    }
};
