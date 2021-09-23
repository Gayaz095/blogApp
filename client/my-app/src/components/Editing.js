import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

function Editing(props) {
  const {
    open,
    handleDeleting,
    head,
    content,
    posts,
    userId,
    authorized,
    ind,
  } = props;
  const [articleTitle, setArticleTitle] = useState(head);
  const [articleContent, setContent] = useState(content);

  const handlePost = (e) => {
    e.preventDefault();
   
    if (authorized) {
      const config = {
        headers: {
          Authorization: `Bearer ${authorized}`,
        },
      };

      const data = {
        information: articleContent,
        subject: articleTitle,
        user_id: userId,
        id: posts,
      };

      axios
        .put(`http://127.0.0.1:8000/polls/${posts}/`, data, config)
        .then(
          (res) => {
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
      <form
        open={open}
        onSubmit={() => handleDeleting(ind)}
      >
        <div className="header-edit">EDIT POST</div>
        <div className="header-section">
          <div style={{ 'color': 'black' }}>
            Edit section:
          </div>
          <textarea
            style={{ width: "100%" }}
            placeholder="Subject"
            type="text"
            value={articleTitle}
            onChange={(evt) => {
              setArticleTitle(evt.target.value);
            }}
          />

          <div/>
          <textarea
            style={{ width: "100%" }}
            placeholder="Information"
            value={articleContent}
            onChange={(evt) => {
              setContent(evt.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handlePost}>
            Submit
          </button>
          <button onClick={() => handleDeleting(ind)}>
            Cancel
          </button>

        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => ({
  authorized: state.authentication.tokenId,
});

export default connect(mapStateToProps)(Editing);
