import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Profile from "../pages/profile/Profile";
import Question from "../pages/Question/Question";
import Submit from "../pages/SubmitAns/Submit";
import Check from "../pages/Check/Check";
import CheckList from "../pages/CheckList/List";
import AllQuestion from "../pages/AllQuestion/AllQuestion";
import EditQuestion from "../pages/EditQuestion/EditQuestion";
import Leader from "../pages/Leaderboard/Leader";
import NotFound from "../pages/Notfound/Notfound";
import { GlobalContext } from "../context/Reducers/Provider";

function Router_(props) {
  let { authState, authDispatch } = useContext(GlobalContext);
  let router;
  let router1 = (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/signup" name="Signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
  let router2 = (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/profile/:id" name="Profile" component={Profile} />

        <Route exact path="/question" component={AllQuestion} />
        <Route exact path="/question/:id" component={Submit} />

        <Route exact path="/leaderboard" component={Leader} />
        {/* <Route exact path="/check/:qid/:uid" component={Check} /> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
  let router3 = (
    <Router>
      {props.children}
      <Switch>
        <Route exact path="/login" name="Login" component={Login} />
        <Route exact path="/admin/question" component={Question} />
        <Route exact path="/admin/question/:id" component={EditQuestion} />
        <Route exact path="/question" component={AllQuestion} />
        <Route exact path="/admin/list" component={CheckList} />
        <Route exact path="/leaderboard" component={Leader} />
        <Route exact path="/check/:qid/:uid" component={Check} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
  if (!authState.isloggedin) router = router1;
  else if (authState.user.role === "user") router = router2;
  else if (authState.user.role === "admin") router = router3;
  return router;
}
export default Router_;
