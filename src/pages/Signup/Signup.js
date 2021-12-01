import React, { useState, useContext } from "react";
import axios from "../../util/axios";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/Reducers/Provider";
import Message from "../../context/action/error";
import styles from "./signup.module.css";
function Signup() {
  let { errState, errDispatch } = useContext(GlobalContext);
  const history = useHistory();
  let [state, setState] = useState({
    form: {
      name: {
        valid: false,
        min: 5,
        value: "",
      },
      email: {
        valid: false,
        isemail: true,
        value: "",
      },
      password: {
        valid: false,
        min: 6,
        value: "",
      },
      confirmpassword: {
        valid: false,
        min: 6,
        value: "",
        issame: true,
      },
    },
    valid: false,
    otp: "",
    isform: true,
    loading: false,
  });
  function check_validity() {
    if (
      state.form.email.valid &&
      state.form.password.valid &&
      state.form.name.valid &&
      state.form.confirmpassword.valid
    ) {
      setState({ ...state, valid: true });
    } else {
      setState({ ...state, valid: false });
    }
  }
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  function isEmailAddress(str) {
    return str.match(pattern);
  }
  function take_input(e, field) {
    e.preventDefault();
    let value = e.target.value;
    let newstate = { ...state };
    newstate.form[field].value = value;
    let bi = true;
    if (newstate.form[field].isemail) {
      if (isEmailAddress(value) == null) bi = false;
    }
    if (newstate.form[field].min) {
      if (value.length < newstate.form[field].min) bi = false;
    }
    if (newstate.form[field].issame) {
      if (value !== newstate.form.password.value) bi = false;
    }
    newstate.form[field].valid = bi;
    setState((prevState) => {
      return newstate;
    });
    check_validity();
  }
  ///////////////////////////////
  ///////////////////////////////
  async function signup(e) {
    e.preventDefault();
    setState({ ...state, loading: true });
    try {
      let res = await axios({
        method: "post",
        url: "/user/signup",
        data: {
          name: state.form.name.value,
          email: state.form.email.value,
          password: state.form.password.value,
          confirmPassword: state.form.confirmpassword.value,
        },
      });
      if (res.data.status === "success") {
        Message({ message: res.data.message, type: 1, error: true })(
          errDispatch
        );
        setState({ ...state, loading: false, isform: false });
      }
    } catch (err) {
      // console.log(err.response.data.message);
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  async function verify(e) {
    e.preventDefault();
    setState({ ...state, loading: true });
    try {
      let res = await axios({
        method: "get",
        url: `/user/activate/${state.form.email.value}/${state.otp}`,
      });
      if (res.data.status === "success") {
        Message({ message: "Account activated", type: 1, error: true })(
          errDispatch
        );
        setState({ ...state, loading: true });
        window.setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  let form1 = (
    <div>
      <p>Enter name:</p>
      <input
        className={styles.input}
        type="text"
        value={state.form.name.value}
        onChange={(e) => {
          take_input(e, "name");
        }}
      />
      <p>Enter email:</p>
      <input
        className={styles.input}
        type="text"
        value={state.form.email.value}
        onChange={(e) => {
          take_input(e, "email");
        }}
      />
      <p>Enter passsword:</p>
      <input
        className={styles.input}
        type="password"
        value={state.form.password.value}
        onChange={(e) => {
          take_input(e, "password");
        }}
      />
      <p>Enter Confirm password:</p>
      <input
        className={styles.input}
        type="password"
        value={state.form.confirmpassword.value}
        onChange={(e) => {
          take_input(e, "confirmpassword");
        }}
      />
      <br />
      <button
        className={styles.button}
        disabled={!state.valid || state.loading}
        onClick={signup}>
        Signup
      </button>
    </div>
  );
  let form2 = (
    <div>
      <p>Enter OTP:</p>
      <input
        className={styles.input}
        type="password"
        value={state.otp}
        onChange={(e) => {
          e.preventDefault();
          setState({ ...state, otp: e.target.value });
        }}
      />
      <br />
      <button className={styles.button} onClick={verify}>
        verify
      </button>
    </div>
  );
  return (
    <div className={styles.t}>
      <h1 className={styles.heading}> Signup</h1>
      <div className={state.isform ? styles.box1 : styles.box2}>
        {state.isform ? form1 : form2}
      </div>
    </div>
  );
}

export default Signup;
