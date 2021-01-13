import PostList from "./component";
import { getPostList } from "./actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    postList: state.posts.postList
});

const mapDispatchToProps = (dispatch) => ({
    getPostList: () => dispatch(getPostList())
});

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
