import "react-native-gesture-handler";
import React from "react";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducers from "./store/reducers";
import thunk from "redux-thunk";

const store = createStore(
    reducers,
    applyMiddleware(
        thunk
    )
);

export default function App () {
    return (
        <Provider store={ store }>
            <Routes/>
        </Provider>
    );
}
