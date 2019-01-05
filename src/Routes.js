import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Signup from "./Containers/Signup";
import AddActivity from "./Containers/AddActivity";

import NotFound from "./Containers/NotFound";
import AppliedRoute from "./Components/AppliedRoute";


export default ( {childProps}) =>
    <Switch>

        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/activities/new" exact component={AddActivity} props={childProps} />


        <Route component={NotFound} />
    </Switch>;