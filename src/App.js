import React from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import User from "./pages/User";
import ErrorPage from "./pages/Error";

const App = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/user/:id" component={User} exact />
        <Route path="/" component={Home} exact />
        <Route path="/*" component={ErrorPage} exact />
      </Switch>
    </React.Fragment>
  );
};

export default App;
