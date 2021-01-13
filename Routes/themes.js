import { DarkTheme, DefaultTheme } from '@react-navigation/native'

const lightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "rgb(255, 45, 85)",
        secondary: "#fff",
        text: '#000'
    }
};

const darkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        primary: "rgb(255, 45, 85)",
        background: "#222",
        secondary: "#222",
        text: "#fff"
    }
};

const customTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: "#3b4957",
        primary: "#fff",
        text: "#ff0",
        border: "#fff",
        notification: "#fff"
    }
};

export const getThemeByKey = (themeKey) => {
    switch (themeKey) {
        case "light":
            return lightTheme;
        case "dark":
            return darkTheme;
        case "custom":
            return customTheme;
        default:
            return lightTheme;
    }
};
