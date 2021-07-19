import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

function NavBar(props) {
  const { authorized, newUser, logout  } = props;

  useEffect(() => {
    if (authorized) {
      const { user_id } = jwt_decode(authorized);
      axios
        .get(`http://127.0.0.1:8000/polls/user/${user_id}/`, {
          headers: {
            Authorization: `Bearer ${authorized}`,
          },
            })
        .then(
          (res) => {
            const { username } = res.data;
            newUser([user_id, username]);
          },
            );
    }
  }, 
  [authorized]);

  return (
    <div className="container">
          <h1 align="center" style={{ fontStyle: 'italic' }}>Blogger Studio</h1>
          {authorized && (
            <div>
              <div>
                <h1 style={{ 'fontSize': '20px', textDecorationLine: 'underline' }}>Options Menu:</h1>
                <p>1. Home of Blogs.</p> <a href="/home">Click me!</a>
                <br/><hr/>
              </div>
              <div >
                <p>2. To view your blog here.</p> <a href="/posts">Click here.</a> 
                <br/><hr/>
              </div> 
              <div>
                <p>3. Start your blog by.</p><a href="/create">Clicking here.</a>
                <br/><hr/>
              </div>
              <div>
              <span>4. </span> 
                <button><a href="/login" onClick={() => {logout()}}>Logout</a></button>
                <br/><hr/>
              </div>
            </div>
          )}
        </div>
            );
}

const mapStateToProps = (state) => ({
  regAcc: state.userData.regAcc,
  regUser: state.userData.regUser,
  authorized: state.authentication.tokenId
});

const mapDispatchToProps = (dispatch) => ({
  logout: (value) => dispatch({ type: "LOG_OUT", payload: value }),
  newUser: (value) => dispatch({ type: "NEW_USER", payload: value }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
