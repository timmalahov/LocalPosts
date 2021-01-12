import Profile from "./component";
import { setAuth } from "./actions";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  isAuthentificated: state.profile.isAuthentificated,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(setAuth(false)),
  login: () => dispatch(setAuth(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
