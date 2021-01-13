import { combineReducers } from "redux";
import { profile } from "../screens/Profile/reducer";
import { posts } from "../components/Posts/reducer";

const reducers = combineReducers({
    profile,
    posts
});

export default reducers;
