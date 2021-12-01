import React from "react";
import { useState, useContext } from "react";
import styles from "./login.module.css";
import axios from "../../util/axios";
import { GlobalContext } from "../../context/Reducers/Provider";
import Login_ from "../../context/action/auth";
import Message from "../../context/action/error";
import { useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  let { authState, authDispatch } = useContext(GlobalContext);
  // console.log(authState);
  let { errState, errDispatch } = useContext(GlobalContext);
  // console.log(authState, authDispatch);
  const [state, setState] = useState({
    form: {
      email: {
        valid: false,
        value: "",
        isemail: true,
      },
      password: {
        valid: false,
        value: "",
        min: 6,
      },
    },
    valid: false,
  });
  ///////////////////////////////////////////
  function check_validity() {
    if (state.form.email.valid && state.form.password.valid) {
      setState((prevState) => {
        let newstate = { ...prevState };
        newstate.valid = true;
        return newstate;
      });
    } else {
      setState((prevState) => {
        let newstate = { ...prevState };
        newstate.valid = false;
        return newstate;
      });
    }
  }
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  function isEmailAddress(str) {
    return str.match(pattern);
  }
  function take_input(e, field) {
    e.preventDefault();
    let value = e.target.value;
    setState((prevState) => {
      let newstate = { ...prevState };
      newstate.form[field].value = value;
      let bi = true;
      if (newstate.form[field].isemail) {
        if (isEmailAddress(value) == null) bi = false;
      }
      if (newstate.form[field].min) {
        if (value.length < 6) bi = false;
      }
      newstate.form[field].valid = bi;
      return newstate;
    });
    check_validity();
  }
  ////////////////////////////////////////////
  async function login(e) {
    e.preventDefault();
    try {
      let res = await axios({
        method: "post",
        url: "/user/login",
        data: {
          email: state.form.email.value,
          password: state.form.password.value,
        },
      });

      if (res.data.status === "success") {
        let obj = {
          isloggedin: true,
          user: res.data.data.user,
          token: res.data.data.token,
        };
        Message({ message: "User is Login", type: 1, error: true })(
          errDispatch
        );
        window.localStorage.setItem("token", res.data.data.token);
        window.localStorage.setItem("user", JSON.stringify(res.data.data.user));
        Login_(obj)(authDispatch);
        window.setTimeout(() => {
          if (res.data.data.user.role === "user")
            history.push(`/profile/${res.data.data.user._id}`);
          else history.push(`/question`);
        }, 3000);
      }
    } catch (err) {
      // console.log(err.response.data.message);
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  return (
    <div>
      <div className={styles.heading}>
        <h1>LOGIN</h1>
      </div>
      <div className={styles.box}>
        <p>Enter Your Email:</p>
        <input
          className={styles.input}
          type="text"
          value={state.form.email.value}
          onChange={(e) => {
            take_input(e, "email");
          }}></input>
        <p>Enter Your password:</p>
        <input
          className={styles.input}
          type="password"
          value={state.form.password.value}
          onChange={(e) => {
            take_input(e, "password");
          }}></input>
        <button
          className={styles.button}
          disabled={!state.valid}
          onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
