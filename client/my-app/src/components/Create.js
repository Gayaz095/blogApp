import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

function Create(props) {
  const { authorized } = props;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authorized) {
      const { user_id } = jwt_decode(authorized);
      const config = {
        headers: { Authorization: `Bearer ${authorized}`  },
      };
      const data = {
        subject: title, information: body,  user_id: user_id
      };
      axios
        .post(`http://127.0.0.1:8000/polls/`, data, config)
        .then(
          (response) => {
            window.location.reload();
          },
          (error) => {
            window.location.reload();
          }
            );
      };
  };

  return (
    <div className="container">
      <h1 className="header" style={{ 'fontSize': '30px'}}>"Share your Thoughts"</h1>
      <div>
        <h2>Create new blogs here:</h2>
        <div>
          <h3>Subject:</h3>
          <textarea type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}/><br />
          <h3>Information:</h3>
          <textarea value={body} onChange={(e) => {setBody(e.target.value)}}
          />
        </div>     
        <div>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <hr />
        <p>[Note:] Please click above option menus to navigate.</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authorized: state.authentication.tokenId
});

export default connect(mapStateToProps)(Create);
