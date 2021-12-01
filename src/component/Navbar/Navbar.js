import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import { GlobalContext } from "../../context/Reducers/Provider";
import { useHistory } from "react-router-dom";
import image from "../../back.png";
function Navbar() {
  const history = useHistory();
  let { authState, authDispatch } = useContext(GlobalContext);
  // console.log(authState);
  let user = JSON.parse(window.localStorage.getItem("user"));
  // console.log(user);
  let arr = [];
  if (!authState.isloggedin) {
    arr.push(
      <div
        className={styles.div}
        key={1}
        onClick={(e) => {
          e.preventDefault();
          history.replace("/signup");
        }}>
        Signup
      </div>
    );
    arr.push(
      <div
        key={2637}
        className={styles.div}
        onClick={(e) => {
          e.preventDefault();
          history.replace("/login");
        }}>
        Login
      </div>
    );
  } else {
    arr.push(
      <div
        key={377}
        className={styles.div}
        onClick={(e) => {
          e.preventDefault();
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("token");
          window.location.assign("/login");
        }}>
        Logout
      </div>
    );
    if (authState.user.role === "user") {
      arr.push(
        <div
          key={37098}
          className={styles.div}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/question`);
          }}>
          Question
        </div>
      );
      arr.push(
        <div
          key={3756788}
          className={styles.div2}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/leaderboard`);
          }}>
          Leader Board
        </div>
      );
      arr.push(
        <div
          key={379}
          className={styles.div}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/profile/${authState.user.id}`);
          }}>
          Profile
        </div>
      );
    } else {
      arr.push(
        <div
          key={37}
          className={styles.div2}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/question`);
          }}>
          Question
        </div>
      );
      arr.push(
        <div
          key={35667}
          className={styles.div2}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/admin/question`);
          }}>
          Make Question
        </div>
      );
      arr.push(
        <div
          key={37}
          className={styles.div}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/admin/list`);
          }}>
          Correction
        </div>
      );
      arr.push(
        <div
          key={373}
          className={styles.div2}
          onClick={(e) => {
            e.preventDefault();
            history.push(`/leaderboard`);
          }}>
          Leader Board
        </div>
      );
    }
  }
  arr.push(
    <div key={234}>
      <div
        onClick={(e) => {
          e.preventDefault();
          history.goBack();
        }}>
        <img className={styles.image} alt={"back"} src={image} />
        <div className={styles.temp}>Back</div>
      </div>
    </div>
  );
  return (
    <div className={styles.navbar}>
      <div className={styles.box}>{arr}</div>
    </div>
  );
}

export default Navbar;
