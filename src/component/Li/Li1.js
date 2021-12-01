import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./li1.module.css";
function Li(props) {
  //   console.log(props);
  const history = useHistory();
  let arr = [styles.el];
  if (props.checked) arr.push(styles.attempted);
  return (
    <div
      className={arr.join(" ")}
      onClick={(e) => {
        e.preventDefault();
        history.push(`/profile/${props._id}`);
      }}>
      <div className={styles.title}>
        <div className={styles.grey}>SNo: {props.sno}</div>
      </div>
      <div className={styles.title}>
        <div className={styles.grey}>Rank:</div>
        {props.title}
      </div>
      <div className={styles.subtitle}>
        <div className={styles.grey}> Name:</div>
        {props.subtitle}{" "}
      </div>
      <div className={styles.marks}>
        {props.name}
        {/* <div className={styles.grey}>Marks:</div> */}
      </div>
      {/* <h6>{props.name} </h6> {props.checked ? "checked" : null} */}
    </div>
  );
}

export default Li;
