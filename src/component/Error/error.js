import React, { useContext } from "react";
import { GlobalContext } from "../../context/Reducers/Provider";
import styles from "./error.module.css";
function Error() {
  let { errState, errDispatch } = useContext(GlobalContext);
  // console.log(errState, errDispatch);
  let style = styles.incorrect;
  if (errState.type) style = styles.correct;
  return (
    <div>
      {errState.error ? (
        <div className={style}>
          <p className={styles.text}>{errState.message}</p>
        </div>
      ) : null}
    </div>
  );
}

export default Error;
