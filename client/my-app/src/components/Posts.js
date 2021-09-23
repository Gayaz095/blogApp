import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import Editing from "./Editing";


import { withStyles, makeStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ModalForm from "./ModalForm";
import InputLabel from '@material-ui/core/InputLabel';

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));



function Posts(props) {


  const triggerText = "Open form";
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };



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
{/**************************here*/}

const handleModalFlag = (ind) => {
  const newArray = [
    ...title.slice(0, ind),
    { ...title[ind], modalFlag: !title[ind].modalFlag },
    ...title.slice(ind + 1),
  ];
 
  setTitle(newArray);
};

const handleClose = (ind) => {
    
  const newArray = [
    ...title.slice(0, ind),
    { ...title[ind], modalFlag: !title[ind].modalFlag },
    ...title.slice(ind + 1),
  ];
  
  setTitle(newArray);
};





{/**********************here*/}

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
                  <button onClick={() => { handleModalFlag(index) }}>EDIT</button>
                  <button onClick={() => { handleClick(item.id) }}>Delete</button>
{/*****************here */}
                  {item.modalFlag && (
                    <Editing
                      open={item.modalFlag}
                      handleClose={handleClose}
                      heading={item.subject}
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
