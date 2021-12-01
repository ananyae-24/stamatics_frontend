import React, { useState, useCallback, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../util/axios";
import Pdf from "../../component/Pdf/Pdf";
import Message from "../../context/action/error";
import { useHistory } from "react-router-dom";
import styles from "./check.module.css";
import { GlobalContext } from "../../context/Reducers/Provider";
import obj from "../../constants";
function Check(props) {
  const history = useHistory();
  const { uid, qid } = useParams();
  let { errState, errDispatch } = useContext(GlobalContext);
  const [state, setState] = useState({
    loading: true,
    form: { marks: 0, remark: "" },
  });
  const fetchdata = useCallback(async () => {
    try {
      let res = await axios({
        method: "get",
        url: `/uq/check/${uid}/${qid}`,
      });
      if (res.data.status === "success") {
        setState((prevState) => {
          let newState = { ...prevState, ...res.data.answer };
          newState.loading = false;
          return newState;
        });
      }
    } catch (err) {
      // alert(res.data.message);
      console.log(err);
    }
  }, [qid, uid]);
  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  // console.log(state);
  //////////////////////////
  async function check(e) {
    e.preventDefault();
    let data = {
      marks: state.form.marks,
      remark: state.form.remark,
      checked: true,
    };
    try {
      let res = await axios({
        method: "post",
        url: `/uq/check/${uid}/${qid}`,
        data,
      });
      if (res.data.status === "success") {
        // alert("checked");
        Message({ message: "Checked", type: 1, error: true })(errDispatch);
        setState({ ...state, checked: true });
        history.push("/admin/list");
        //   setState((prevState) => {
        //     let newState = { ...prevState, ...res.data.answer };
        //     newState.loading = false;
        //     return newState;
        //   });
      }
    } catch (err) {
      Message({ message: err.response.data.message, type: 0, error: true })(
        errDispatch
      );
    }
  }
  ///////////////////////
  let page, form;
  if (!state.loading) {
    page = (
      <div className={styles.center}>
        <h1 className={styles.box1}>{state.question.title}</h1>
        <h2 className={styles.box2}>{state.question.subtitle}</h2>
        <h3 className={styles.box3}>{`Marks:${state.question.marks}`}</h3>
        <h2>Question</h2>

        <a href={`${obj.url}public/images/${state.question.image}`}>
          <p>Link to the Question</p>
        </a>
        {/* <Pdf
          url={`http://localhost:8080/public/images/${state.question.image}`}></Pdf> */}
        <h2>Answer</h2>
        <a href={`${obj.url}public/images/${state.answer}`}>
          <p>Link to the answer</p>
        </a>
        {/* <Pdf url={`http://localhost:8080/public/images/${state.answer}`}></Pdf> */}
      </div>
    );
    form = (
      <div className={styles.center}>
        <p>Enter marks</p>
        <input
          type="number"
          // disabled={state.checked}
          value={!state.checked ? state.form.marks : state.marks}
          onChange={(e) => {
            e.preventDefault();
            setState({
              ...state,
              form: { ...state.form, marks: e.target.value },
            });
          }}
        />
        <p>Enter remark</p>
        <input
          type="text"
          // disabled={state.checked}
          value={!state.checked ? state.form.remark : state.remark}
          onChange={(e) => {
            e.preventDefault();
            setState({
              ...state,
              form: { ...state.form, remark: e.target.value },
            });
          }}
        />
        <br />
        <button onClick={check}>Submit</button>
      </div>
    );
  }
  return (
    <div>
      {!state.loading ? page : null}
      {!state.loading ? form : null}
    </div>
  );
}

export default Check;
