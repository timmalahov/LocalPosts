import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers";
import * as Localization from "expo-localization";

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
