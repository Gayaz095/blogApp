import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import Editing from "./Editing";

function Posts(props) {
  const { authorized } = props;
  const [title, setTitle] = useState([]);
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
        .get(`http://127.0.0.1:8000/polls/article/${user_id}`, {
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
            setTitle(newArray);
          },
          (error) => {
            props.history.push("/login");
          }
        );
    }
  }, 
  [authorized]);

  const handleEdit = (ind) => {
    const newArray = [
      ...title.slice(0, ind),
      { ...title[ind], editPage: !title[ind].editPage },
      ...title.slice(ind + 1),
    ];
    setTitle(newArray);
  };

  const handleDeleting = (ind) => {
    const newArray = [
    ...title.slice(0, ind),
      { ...title[ind], editPage: !title[ind].editPage },
      ...title.slice(ind + 1),
    ];
    setTitle(newArray);
  };

  const handleClick = (posts) => {
    if (authorized) {
      const config = {
        headers: { Authorization: `Bearer ${authorized}` }
      };

      axios
        .delete(`http://127.0.0.1:8000/polls/${[posts]}/`, config)
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
      <h1 style={{ 'fontSize': '20px', textDecorationLine: 'underline' }}>Blogs created by you</h1>
      {title.map((item, index) => {
        return (
          <div key={index}>
            <h1 style={{ 'fontSize': '20px' }}>Subject:</h1>
            <p> {item.subject}</p>
            <h1 style={{ 'fontSize': '20px' }} >Info:</h1>
            <p> {item.information}</p>
              {user === item.user_id ? 
              (
                <div>
                  <button onClick={() => { handleEdit(index) }}>EDIT</button>
                  <button onClick={() => { handleClick(item.id) }}>Delete</button>
                  {item.editPage && (
                    <Editing
                      open={item.editPage}
                      handleDeleting={handleDeleting}
                      head={item.subject}
                      content={item.information}
                      posts={item.id}
                      userId={item.user_id}
                      ind={index}
                    />
                  )}
                
                </div>
              ) : null}
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

export default connect(mapStateToProps)(Posts);
