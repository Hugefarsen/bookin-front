import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Containers/Login";
import Signup from "./Containers/Signup";
import Lander from "./Containers/Lander";
import Admin from "./Containers/Admin";

/*
import Room from "./Containers/Room";
*/
import Rooms from "./Containers/Rooms";

import Category from "./Containers/Category";

import Categories from "./Containers/Categories";
/*
import User from "./Containers/User"
*/
import Users from "./Containers/Users";

import AddActivity from "./Containers/AddActivity";

import Activity from "./Containers/Activity";



import AppliedRoute from "./Components/AppliedRoute";
import AuthenticatedRoute from "./Components/AuthenticatedRoute";
import AdminRoute from "./Components/AdminRoute";
import UnauthenticatedRoute from "./Components/UnauthenticatedRoute";

import NotFound from "./Containers/NotFound";

export default ( {childProps}) =>
    <Switch>

        <AppliedRoute path="/" exact component={Lander} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />

        <AdminRoute path="/activity/new" exact component={AddActivity} props={childProps} />

        <AuthenticatedRoute path="/home" exact component={Home} props={childProps} />

        <AuthenticatedRoute path="/activity/:id" exact component={Activity} props={childProps} />
        <AuthenticatedRoute path="/categories" exact component={Categories} props={childProps} />
        <AuthenticatedRoute path="/category/:id" exact component={Category} props={childProps} />

        <AdminRoute path="/rooms" exact component={Rooms} props={childProps} />
        <AdminRoute path="/users" exact component={Users} props={childProps} />


        <AdminRoute path="/admin" exact component={Admin} props={childProps} />



        <Route component={NotFound} />

    </Switch>;