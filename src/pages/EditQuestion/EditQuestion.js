import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "../../util/axios";
import { useParams } from "react-router-dom";
import Pdf from "../../component/Pdf/Pdf";
import { GlobalContext } from "../../context/Reducers/Provider";
import Message from "../../context/action/error";
import { useHistory } from "react-router-dom";
import styles from "./edit.module.css";
import obj from "../../constants";
function EditQuestion(props) {
  let { errState, errDispatch } = useContext(GlobalContext);
  let { id } = useParams();
  const history = useHistory();
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
  const fetchdata = useCallback(async () => {
    let res = await axios({
      method: "get",
      url: `/question/${id}`,
    });
    if (res.data.status === "success") {
      let newstate = { ...state };
      // console.log(res.data);
      newstate.form.marks.value = res.data.question.marks;
      newstate.form.title.value = res.data.question.title;
      newstate.form.subtitle.value = res.data.question.subtitle;
      newstate.form.marks.valid = true;
      newstate.form.title.valid = true;
      newstate.form.subtitle.valid = true;
      newstate.form.selectedFile.valid = true;
      newstate.valid = true;
      newstate.currentfile = res.data.question.image;
      setState(newstate);
    } else {
      alert(res.data.message);
    }
  }, [id]);
  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  function check_validity() {
    if (
      state.form.selectedFile.valid &&
      state.form.title.valid &&
      state.form.subtitle.valid &&
      state.form.marks.valid
    ) {
      setState({ ...state, valid: true });
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
    newstate.form[field].valid = bi;
    setState((prevState) => {
      return newstate;
    });
    check_validity();
  }
  function onFileChange(e) {
    e.preventDefault();
    // Update the state
    setState((prevState) => {
      let newstate = { ...state };
      newstate.form.selectedFile.value = e.target.files[0];
      newstate.form.selectedFile.valid = true;
      return newstate;
    });
  }
  async function submitquestion(e) {
    e.preventDefault();
    let formData = new FormData();
    if (state.form.selectedFile.value !== "") {
      formData.append(
        "image",
        state.form.selectedFile.value,
        state.form.selectedFile.value.name
      );
    }
    formData.append("title", state.form.title.value);
    formData.append("subtitle", state.form.subtitle.value);
    formData.append("marks", state.form.marks.value);
    try {
      let res = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: `/question/${id}`,
        data: formData,
      });
      if (res.data.status === "success") {
        Message({ message: "Question Updated", type: 1, error: true })(
          errDispatch
        );
        window.setTimeout(() => {
          history.go(0);
        }, 2000);
        // alert("question Updated");
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  return (
    <div className={styles.box}>
      <div className={styles.title}>
        <h2>Change info:</h2>
      </div>
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
      <button disabled={!state.valid} onClick={submitquestion}>
        Edit
      </button>
      <br />
      <br />

      <a href={`${obj.url}public/images/${state.currentfile}`}>
        Link to current question
      </a>
      {/* <Pdf
        url={`http://localhost:8080/public/images/${state.currentfile}`}></Pdf> */}
    </div>
  );
}

export default EditQuestion;
