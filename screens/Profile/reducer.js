const initialState = {
    isAuthentificated: false,
    theme: "light"
};

export const profile = (state = initialState, action) => {
    switch (action.type) {
        case "SET_AUTHENTIFICATED":
            return Object.assign({}, state, { isAuthentificated: action.payload });
        case "SET_THEME":
            return Object.assign({}, state, { theme: action.payload });
        default:
            return state;
    }
};
