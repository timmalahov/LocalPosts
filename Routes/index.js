import React, { useEffect } from "react";
import { Text } from "react-native";

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { navigationRef, isReadyRef, navigate } from "../RootNavigation";
import * as Linking from "expo-linking";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Feed from "../screens/Feed";
import Settings from "../screens/Settings";
import Profile from "../screens/Profile/index";
import BlogPostDetails from "../screens/BlogPostDetails";
import { connect } from "react-redux";

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(255, 45, 85)",
    secondary: "#fff",
  },
};

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(255, 45, 85)",
    background: "#222",
    secondary: "#222",
    text: "#fff",
  },
};

const customTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#3b4957",
    primary: "#fff",
    text: "#fff",
    border: "#fff",
    notification: "#fff",
  },
};

const getThemeByKey = (themeKey) => {
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

const prefix = Linking.makeUrl("/");

const linking = {
  prefixes: [prefix],
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Feed" component={Feed} />
    <Stack.Screen name="Details" component={BlogPostDetails} />
  </Stack.Navigator>
);

const createTabs = (isAuthentificated) => () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Feed"
        options={{ title: "asasdasdasd" }}
        children={createHomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      {isAuthentificated && (
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const Routes = ({ ...props }) => {
  const { isAuthentificated, selectedTheme } = props;
  const Tabs = createTabs(isAuthentificated);

  useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  const handleURL = ({ url }) => {
    let { path, queryParams } = Linking.parse(url);

    if (queryParams.postId) {
      navigate("Details", { id: queryParams.postId });
      return;
    }

    if (queryParams.options) {
      if (isAuthentificated) {
        navigate("Settings");
        return;
      }
      navigate("Profile", {
        redirectProps: { name: "Settings", params: queryParams.options },
      });
      return;
    }
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then((url) => {
        if (url) {
          handleURL({ url });
        }
      })
      .catch((err) => {
        console.error(err);
      });
    Linking.addEventListener("url", handleURL);

    return () => {
      Linking.removeEventListener("url", handleURL);
    };
  }, []);

  return (
    <NavigationContainer
      theme={getThemeByKey(selectedTheme)}
      ref={navigationRef}
      linking={linking}
      onReady={() => {
        isReadyRef.current = true;
      }}
      fallback={<Text>Loading...</Text>}
    >
      <Tabs />
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthentificated: state.profile.isAuthentificated,
  selectedTheme: state.profile.theme,
});

export default connect(mapStateToProps)(Routes);
