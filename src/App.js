import logo from "./logo.svg";

import styles from "./App.module.css";
import { useContext, useEffect } from "react";
import Navbar from "./component/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Error from "./component/Error/error";
import { GlobalContext } from "./context/Reducers/Provider";
import Login_ from "./context/action/auth";
function App() {
  let { authState, authDispatch } = useContext(GlobalContext);
  // useEffect(() => {
  //   if (window.localStorage.getItem("token")) {
  //     let obj = {
  //       isloggedin: true,
  //       user: JSON.parse(window.localStorage.getItem("token")),
  //       token: window.localStorage.getItem("token"),
  //     };
  //     Login_(obj)(authDispatch);
  //   }
  // }, []);
  return (
    <div className={styles.over}>
      <Error />
      <Navbar></Navbar>
    </div>
  );
}

export default App;
