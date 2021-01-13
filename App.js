import "react-native-gesture-handler";
import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./store/reducers";

const store = createStore(reducers);

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
