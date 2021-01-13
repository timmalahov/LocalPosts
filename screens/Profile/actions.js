export const setAuth = (isAuthentificated) => ({
    type: "SET_AUTHENTIFICATED",
    payload: isAuthentificated
});

export const setTheme = (theme) => ({
    type: "SET_THEME",
    payload: theme
});
