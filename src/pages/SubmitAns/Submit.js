import React, { useState, useEffect, useCallback, useContext } from "react";
import { GlobalContext } from "../../context/Reducers/Provider";
import { useParams } from "react-router-dom";
import axios from "../../util/axios";
import Pdf from "../../component/Pdf/Pdf";
import Message from "../../context/action/error";
import { useHistory } from "react-router-dom";
import styles from "./submit.module.css";
import obj from "../../constants";
function Submit_(props) {
  let { errState, errDispatch } = useContext(GlobalContext);
  let history = useHistory();
  const { id } = useParams();
  const [state, setState] = useState(0);
  const [state2, setState2] = useState({ selectedFile: "" });
  const [state3, setState3] = useState(0);
  ////////////////////////
  const fetchdata = useCallback(async () => {
    try {
      let res = await axios({
        method: "get",
        url: `/question/${id}`,
      });
      if (res.data.status === "success") {
        setState(res.data.question);
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }, [id]);
  const fetchdata2 = useCallback(async () => {
    try {
      let res = await axios({
        method: "get",
        url: `/uq/${id}`,
      });
      if (res.data.status === "success") {
        setState3(res.data.answer);
      }
    } catch (err) {}
  }, [id]);
  useEffect(() => {
    fetchdata();
    fetchdata2();
  }, [fetchdata, fetchdata2]);
  ///////////////////////
  console.log(state3);
  let page = (
    <div className={styles.box}>
      <h1 className={styles.title}>{state.title}</h1>
      <h2 className={styles.subtitle}>{state.subtitle}</h2>
      <h3 className={styles.marks}>Marks: {state.marks}</h3>
      <div className={styles.pdf}>
        <Pdf url={`${obj.url}public/images/${state.image}`} />
      </div>
    </div>
  );
  /////////////////////////
  function onFileChange(e) {
    e.preventDefault();
    // Update the state
    setState2((prevState) => {
      let newstate = { ...state2 };
      newstate.selectedFile = e.target.files[0];
      return newstate;
    });
  }
  async function submitquestion(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("answer", state2.selectedFile, state2.selectedFile.name);
    try {
      let res = await axios({
        method: "post",
        url: `/uq/${id}`,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      });

      if (res.data.status == "success") {
        Message({ message: "Answer posted", type: 1, error: true })(
          errDispatch
        );

        window.setTimeout(() => {
          history.go(0);
        }, 3000);
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  let page2 = (
    <div>
      <div>Answer File:</div>
      <input type="file" onChange={onFileChange} />
      <button onClick={submitquestion}>Submit</button>
    </div>
  );
  let page3 = (
    <div className={styles.box}>
      <h2 className={styles.title}>Answer</h2>
      <div>
        <h3 className={styles.subtitle}>Alloted Marks:</h3>
        <div>{state3.marks}</div>
      </div>
      <h2>Link to answer:</h2>
      <a href={`${obj.url}public/images/${state3.answer}`}>
        My_answer
        {state3.answer}
      </a>

      {state3.checked ? (
        <div>
          <h3 className={styles.subtitle}>Remark</h3>
          <div> {state3.remark}</div>
        </div>
      ) : null}
    </div>
  );
  //////////////////////////////
  return (
    <div>
      {state ? page : null}
      {state3 ? page3 : page2}
    </div>
  );
}

export default Submit_;
