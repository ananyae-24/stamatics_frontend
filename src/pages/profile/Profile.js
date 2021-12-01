import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../util/axios";
import styles from "./profile.module.css";
import image from "../../default.jpg";
import Message from "../../context/action/error";
import { GlobalContext } from "../../context/Reducers/Provider";
import { useHistory } from "react-router-dom";
import obj from "../../constants";
function Profile(props) {
  const history = useHistory();
  let { errState, errDispatch } = useContext(GlobalContext);
  const { id } = useParams();
  const [state, setState] = useState(0);
  // console.log(state);
  const fetchdata = useCallback(async () => {
    let res = await axios({
      method: "get",
      url: `/user/profile/${id}`,
    });
    if (res.data.status === "success") {
      // console.log(res.data.user);
      setState(res.data.user);
    } else {
      alert(res.data.message);
    }
  }, [id]);
  useEffect(() => {
    fetchdata();
  }, [fetchdata]);

  function take_input(e) {
    e.preventDefault();
    let value = e.target.value;
    setState((prevState) => {
      return { ...prevState, name: value };
    });
  }
  function onFileChange(e) {
    e.preventDefault();
    // Update the state
    setState((prevState) => {
      return { ...prevState, selectedFile: e.target.files[0] };
    });
  }
  async function updateprofile(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", state.name);
    if (state.selectedFile) {
      formData.append("image", state.selectedFile, state.selectedFile.name);
    }
    try {
      let res = await axios({
        method: "post",
        headers: { "Content-Type": "multipart/form-data" },
        url: `/user/profile/${id}`,
        data: formData,
      });
      if (res.data.status === "success") {
        Message({ message: "Profile Updated", type: 1, error: true })(
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
  let form = (
    <div>
      <div className={styles.heading}>
        <h1>My Profile</h1>{" "}
      </div>
      <div className={styles.i}>
        <img
          alt="My_photo"
          className={styles.image}
          src={!state.image ? image : `${obj.url}public/images/${state.image}`}
        />
        <p className={styles.caption}> Hey it me {state.name} !!!!!!!</p>
      </div>
      <div className={styles.box}>
        <p>Name</p>
        <input
          className={styles.input}
          type="text"
          value={state.name}
          onChange={(e) => {
            take_input(e);
          }}
        />
        <p>Email : {state.email}</p>
        <div>
          <input type="file" onChange={onFileChange} />
        </div>
        <button onClick={updateprofile}>Update</button>
      </div>
    </div>
  );
  return <div className={styles.t}>{state ? form : null}</div>;
}

export default Profile;
