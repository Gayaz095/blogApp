import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

function SignIn(props) {
  const { logout } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect((value) => {
    logout();
  }, 
  []);
  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    axios
      .post("http://127.0.0.1:8000/polls/token/", {
        username: username,
        password: password,
      })
      .then((response) => {  
        props.authorized(response.data);     
        props.history.push("/home");
      })
      .catch((error) => {        
      });
  };

  return (
    <div className="container">
      <hr />
        <div>
          <h1>
            Sign in
          </h1>

          <form onSubmit={handleSubmit}>
            <input required onChange={(e) => setUsername(e.target.value)}/>
            <br/><br />
            <input required type="password" onChange={(e) => setPassword(e.target.value)}/>
            <br /><br />
            <button type="submit">
              SignIn
            </button>
            <div>
              <hr/>
              <div>
              New Members should registered here: <a href="/" >"Click me!"</a>
              </div>
            </div>
          </form>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({state});

const mapDispatchToProps = (dispatch) => ({
  authorized: (auth) => dispatch({ type: "AUTH_GRANTED", payload: auth }),
  logout: (value) => dispatch({ type: "LOG_OUT", payload: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
