import React, { useState, useContext } from "react";
import axios from "../../util/axios";
import Message from "../../context/action/error";
import { useHistory } from "react-router-dom";
import styles from "./question.module.css";
import { GlobalContext } from "../../context/Reducers/Provider";
function Question(props) {
  const history = useHistory();
  let { errState, errDispatch } = useContext(GlobalContext);
  const [state, setState] = useState({
    form: {
      title: {
        valid: false,
        min: 4,
        value: "",
      },
      subtitle: {
        valid: false,
        min: 4,
        value: "",
      },
      marks: {
        valid: false,
        min: 1,
        value: 0,
      },
      selectedFile: {
        valid: false,
        value: "",
      },
      valid: false,
    },
  });
  function check_validity(obj) {
    if (
      obj.form.selectedFile.valid &&
      obj.form.title.valid &&
      obj.form.subtitle.valid &&
      obj.form.marks.valid
    ) {
      return true;
      // setState((prevState) => {
      //   return { ...prevState, valid: true };
      // });
    }
    return false;
  }
  let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  function isEmailAddress(str) {
    return str.match(pattern);
  }
  function take_input(e, field) {
    e.preventDefault();
    let value = e.target.value;
    // let newstate = { ...state };
    // newstate.form[field].value = value;
    // let bi = true;
    // if (newstate.form[field].isemail) {
    //   if (isEmailAddress(value) == null) bi = false;
    // }
    // if (newstate.form[field].min) {
    //   if (value.length < newstate.form[field].min) bi = false;
    // }
    // newstate.form[field].valid = bi;
    setState((prevState) => {
      let newstate = { ...prevState };
      newstate.form[field].value = value;
      let bi = true;
      if (newstate.form[field].isemail) {
        if (isEmailAddress(value) == null) bi = false;
      }
      if (newstate.form[field].min) {
        if (value.length < newstate.form[field].min) bi = false;
      }
      newstate.form[field].valid = bi;
      newstate.valid = check_validity(newstate);
      // console.log(newstate);
      return newstate;
    });
  }
  function onFileChange(e) {
    e.preventDefault();
    // Update the state
    setState((prevState) => {
      let newstate = { ...prevState };
      newstate.form.selectedFile.value = e.target.files[0];
      newstate.form.selectedFile.valid = true;
      newstate.valid = check_validity(newstate);
      return newstate;
    });
  }
  async function submitquestion(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append(
      "image",
      state.form.selectedFile.value,
      state.form.selectedFile.value.name
    );
    formData.append("title", state.form.title.value);
    formData.append("subtitle", state.form.subtitle.value);
    formData.append("marks", state.form.marks.value);
    try {
      let res = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: `/question`,
        data: formData,
      });
      if (res.data.status === "success") {
        Message({ message: "question posted", type: 1, error: true })(
          errDispatch
        );
        window.setTimeout(() => {
          history.push("/admin/list");
        }, 2000);
        // alert("question posted");
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
      // alert("some error");
    }
  }
  return (
    <div className={styles.center}>
      <h2 className={styles.box}>Make Question</h2>
      <p>Enter title:</p>
      <input
        type="text"
        value={state.form.title.value}
        onChange={(e) => {
          take_input(e, "title");
        }}
      />
      <p>Enter Subtitle:</p>
      <input
        type="text"
        value={state.form.subtitle.value}
        onChange={(e) => {
          take_input(e, "subtitle");
        }}
      />
      <p>Enter Marks:</p>
      <input
        type="number"
        value={state.form.marks.value}
        onChange={(e) => {
          take_input(e, "marks");
        }}
      />
      <p>Input File:</p>
      <input type="file" onChange={onFileChange} />
      <br />
      <button disabled={!state.valid} onClick={submitquestion}>
        Upload
      </button>
    </div>
  );
}

export default Question;
