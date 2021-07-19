import React from "react";

function Register() {
  useEffect(() => {
    axios
      .post("http://127.0.0.1:8000/polls/token/", {
        username: "username",
        password: "password",
        refresh:  "token",
      })
      .then(
        (response) => {
          const { access, refresh } = res.data;
          window.localStorage.setItem("access_token", access);
          window.localStorage.setItem("refresh_token", access);
        },
        (error) => {
        }
      );
  }, 
  []);
  return <div>Register</div>;
}

export default Register;
