import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";

function Home(props) {
  const { authorized } = props;
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authorized === null) {
      props.history.push("/login");
    }
    if (authorized) {
      const authorized = localStorage.getItem("tokenId");
      const { user_id } = jwt_decode(authorized);
      setUser(user_id);
      axios
        .get("http://127.0.0.1:8000/polls/", {
          headers: {
            Authorization: `Bearer ${authorized}`,
          },
        })
        .then(
          (response) => {
            const array = response.data;
            const newArray = array.map((item) => {
              return { ...item }
            });
            setArticle(newArray);
          },
          (error) => {
            props.history.push("/login");
          }
        );
    }
  },
  [authorized]);

  const handleClick = (posts) => {
    if (authorized) {
      const config = {
        headers: {
          Authorization: `Bearer ${authorized}`,
        },
      };
      axios
        .delete(`http://127.0.0.1:8000/polls/${posts}/`, config)
        .then(
          (response) => {
            window.location.reload();
          },
          (error) => {
            window.location.reload();
          }
            );
    }
  };

  return (
    <div className="container">
      <h2 className="header">"Latest additions are here"</h2>
      {article.map((item, index) => {
        return (
          <div key={index}>
                <h4 style={{ 'fontSize': '20px' }}>Subject:</h4><p>{item.subject}</p>
                <h3 style={{ 'fontSize': '20px' }}>Information:</h3><p>{item.information}</p>
              <div>
              </div>
              
              { user === item.user_id ? 
              (
                <span>
                  <button onClick={() => { handleClick(item.id) }}>Delete</button>
                </span>
              ) : null }
              <hr />
              
            </div>
                );
      })}
    </div>
          );
};

const mapStateToProps = (state) => ({
  authorized: state.authentication.tokenId,
});

export default connect(mapStateToProps)(Home);
