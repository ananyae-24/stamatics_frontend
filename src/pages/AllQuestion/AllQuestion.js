import React, { useState, useCallback, useEffect } from "react";
import axios from "../../util/axios";
import QLi from "../../component/QLi/QLi";
import styles from "./allquestion.module.css";
function AllQuestion(props) {
  const [state, setState] = useState({});
  const fetchdata = useCallback(async () => {
    let res = await axios({
      method: "get",
      url: `/question/`,
    });
    if (res.data.status === "success") {
      setState((prevState) => {
        return { ...prevState, questions: res.data.questions };
      });
    } else {
      alert(res.data.message);
    }
    res = await axios({
      method: "get",
      url: `/user/question/`,
    });
    if (res.data.status === "success") {
      setState((prevState) => {
        return { ...prevState, attempted: res.data.questions };
      });
    } else {
      alert(res.data.message);
    }
  }, []);

  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  let arr = [];
  if (state.questions && state.attempted && state.questions.length > 0) {
    let init = state.questions[0].title;
    arr.push(
      <div key={0}>
        <div className={styles.heading2}>{init}</div>
        <hr className={styles.hr} />
      </div>
    );
    state.questions.forEach((item, index) => {
      if (item.title != init) {
        init = item.title;
        arr.push(
          <div key={index}>
            <div className={styles.heading2}>{init}</div>
            <hr className={styles.hr} />
          </div>
        );
      }
      arr.push(
        <QLi
          key={item._id}
          title={item.title}
          subtitle={item.subtitle}
          marks={item.marks}
          attempted={state.attempted.indexOf(item._id) !== -1 ? true : false}
          qid={item._id}
        />
      );
    });
  }
  // console.log(state);
  // console.log(arr);
  return (
    <div>
      <div>
        <h1 className={styles.heading}>Questions</h1>
      </div>
      <div className={styles.box}> {state ? arr : null}</div>
    </div>
  );
}

export default AllQuestion;
