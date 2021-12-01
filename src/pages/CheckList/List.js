import React, { useCallback, useEffect, useState } from "react";
import axios from "../../util/axios";
import Li from "../../component/Li/Li";
import styles from "./list.module.css";
function List(props) {
  const [state, setState] = useState(0);
  const fetchdata = useCallback(async () => {
    let res = await axios({
      method: "get",
      url: `/uq/`,
    });
    if (res.data.status === "success") {
      setState(res.data.u_q);
    } else {
      alert(res.data.message);
    }
  }, []);
  useEffect(() => {
    fetchdata();
  }, [fetchdata]);
  let arr = [];
  if (state) {
    state.forEach((item) =>
      arr.push(
        <Li
          key={item._id}
          title={item.question.title}
          subtitle={item.question.subtitle}
          name={item.person.name}
          checked={item.checked}
          uid={item.person._id}
          qid={item.question._id}
        />
      )
    );
  }
  let form = (
    <div className={styles.bbox}>
      <div className={styles.title}>Question till now:</div>
      <div className={styles.box}>{arr}</div>
    </div>
  );
  return <div>{state ? form : null}</div>;
}

export default List;
