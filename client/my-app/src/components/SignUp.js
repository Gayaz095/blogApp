import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

function SignUp(props) {
  const { logout } = props;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    window.localStorage.clear();
    axios
      .post("http://127.0.0.1:8000/polls/register/", {
        username: username,
        password: password,
      })
      .then((response) => {
        const { value } = response.data;
      })
  };

  useEffect((value) => {
    logout(value);
  }, 
  []);

  return (
    <div className="container">
      <hr />
        <div>
          <p style={{ 'fontSize': '20px'}}>Registered members <a href="login/">Click here.</a></p>
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit}>
            <input required name="username" onChange={(e) => setUsername(e.target.value)}/>
            <br /><br />
              <div>
                <input  required type="password" onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <hr />
                <button type="submit">SignUp</button>
              <hr />
              <div>
                <div>[Note:] Please <a href="login/">Click here.</a> after clicking SignUp.</div>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({state});

const mapDispatchToProps = (dispatch) => ({
  authGranted: (auth) => dispatch({ type: "AUTH_GRANTED", payload: auth }),
  logout: (value) => dispatch({ type: "LOG_OUT", payload: value })
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
