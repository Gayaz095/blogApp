import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

function Editing(props) {
  const {
    open,
    handleClose,
    heading,
    content,
    posts,
    userId,
    authorized,
    ind,
  } = props;
  const [blogHeading, setBlogHeading] = useState(heading);
  const [blogContent, setBlogContent] = useState(content);

  const handlePost = (e) => {
    e.preventDefault();
   
    if (authorized) {
      const config = {
        headers: {
          Authorization: `Bearer ${authorized}`,
        },
      };

      const data = {
        information: blogContent,
        subject: blogHeading,
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
            // console.log(error);
            window.location.reload();
            // props.history.push("/login");
          }
        );
    }
  };

  return (
    <div>
      <form
        open={open}
        onSubmit={() => handleClose(ind)}
      >
        <div id="form-dialog-title">EDIT POST</div>
        <div>
          <div>
            Make the changes and click on Submit. Changed your mind? click on
            Cancel.
          </div>
          <input
            id="name"
            label="Blog Heading"
            type="text"
            value={blogHeading}
            onChange={(evt) => {
              setBlogHeading(evt.target.value);
            }}
          />

          <div m={4} />
          <input
            style={{ width: "100%" }}
            variant="outlined"
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={blogContent}
            onChange={(evt) => {
              setBlogContent(evt.target.value);
            }}
          />
        </div>
        <div>
          <button onClick={handlePost} color="primary">
            Submit
          </button>
          <button onClick={() => handleClose(ind)} color="primary">
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




// import React, { useState } from "react";
// import { connect } from "react-redux";
// import axios from "axios";

// function Editing(props) {
//   const {
//     authorized,
//     open,
//     handleClose,
//     heading,
//     content,
//     posts,
//     userId,
//     ind,
//   } = props;
//   const [blogHeading, setBlogHeading] = useState(heading);
//   const [blogContent, setBlogContent] = useState(content);

//   const handlePost = (e) => {
//     e.preventDefault();
   
//     if (authorized) {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${authorized}`,
//         },
//       };

//       const data = {
//         information: blogContent,
//         subject: blogHeading,
//         user_id: userId,
//         id: posts,
//       };

//       axios
//         .put(`http://127.0.0.1:8000/user_blog_api/${posts}/`, data, config)
//         .then(
//           (res) => {
//             window.location.reload();
//           },
//           (error) => {
//             // console.log(error);
//             window.location.reload();
//             // props.history.push("/login");
//           }
//         );
//     }
//   };

//   return (
//     <div>
//       <form
//         open={open}
//         onSubmit={()=>handleClose(ind)}
//       >
//         <div>EDIT POST</div>
//         <div>
//           <div>
//             Make the changes and click on Submit. Changed your mind? click on
//             Cancel.
//           </div>
//           <textarea
//             id="name"
//             label="Blog Heading"
//             type="text"
//             value={blogHeading}
//             onChange={(evt) => {
//               setBlogHeading(evt.target.value);
//             }}
//           />

//           <div />
//           <textarea
//             placeholder="Maximum 4 rows"
//             value={blogContent}
//             onChange={(evt) => {
//               setBlogContent(evt.target.value);
//             }}
//           />
//           </div>
//         <div>
//           <button onClick={handlePost}>
//             Submit
//           </button>
//           <button onClick={() => handleClose(ind)}>
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// const mapStateToProps = (state) => ({
//   authorized: state.authentication.tokenId,
// });

// export default connect(mapStateToProps)(Editing);
