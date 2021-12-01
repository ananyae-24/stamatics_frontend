import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from "./qli.module.css";
import { GlobalContext } from "../../context/Reducers/Provider";
function QLi(props) {
  //   console.log(props);
  let { authState, authDispatch } = useContext(GlobalContext);
  const history = useHistory();
  let arr = [styles.el];
  if (props.attempted) arr.push(styles.attempted);
  return (
    <div
      className={arr.join(" ")}
      onClick={(e) => {
        e.preventDefault();
        if (authState.user.role === "user")
          history.push(`/question/${props.qid}`);
        else {
          history.push(`/admin/question/${props.qid}`);
        }
      }}>
      <div className={styles.title}>
        <div className={styles.grey}>Set:</div>
        {props.title}
      </div>
      <div className={styles.subtitle}>
        <div className={styles.grey}> Name:</div>
        {props.subtitle}{" "}
      </div>
      <div className={styles.marks}>
        {props.marks}
        <div className={styles.grey}>Marks:</div>
      </div>
      {/* {props.attempted ? "attempted" : null} */}
    </div>
  );
}

export default QLi;
