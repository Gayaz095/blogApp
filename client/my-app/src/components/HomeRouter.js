import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import SignUp from "./SignUp";
import Home from "./Home";
import SignIn from "./SignIn";
import Posts from "./Posts";
import Create from "./Create";

function HomeRouter(props) {
  useEffect((value) => {
       props.authRun()
  }, []);

  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/create" component={Create} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({state});

const mapDispatchToProps = (dispatch) => ({
  authRun: (value) => dispatch({ type: "AUTH_RUN", payload: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeRouter);
