import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "../../util/axios";
import { GlobalContext } from "../../context/Reducers/Provider";
import Li1 from "../../component/Li/Li1";
import styles from "./leader.module.css";
import { useHistory } from "react-router-dom";
function Leader(props) {
  const history = useHistory();
  let [state, setState] = useState(0);
  let { authState, authDispatch } = useContext(GlobalContext);
  let user = JSON.parse(window.localStorage.getItem("user"));
  console.log(user);
  let userid = user._id || authState.user._id;
  const fetchdata = useCallback(async () => {
    try {
      let res = await axios({
        method: "get",
        url: `/user/all`,
      });
      if (res.data.status === "success") {
        setState(res.data.users);
      }
    } catch (err) {}
  }, []);
  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  let arr = [];
  let myrank = 0;
  if (state) {
    let rank = 1;
    let curr = state[0].marks;

    state.forEach((item, index) => {
      if (curr !== item.marks) {
        rank++;
      }
      if (item._id == userid) {
        myrank = rank;
      }
      arr.push(
        <Li1
          key={item._id}
          sno={index}
          title={rank}
          subtitle={item.name}
          name={item.email}
          checked={item._id == userid}
          _id={item._id}
        />
      );
    });
  }
  window.setTimeout(() => {
    history.go(0);
  }, 10 * 60 * 1000);
  return (
    <div className={styles.box}>
      <div className={styles.title}>Leader Board</div>
      <h1>{`MY RANK:${myrank}`}</h1>
      <div>{state ? arr : null}</div>
    </div>
  );
}

export default Leader;
