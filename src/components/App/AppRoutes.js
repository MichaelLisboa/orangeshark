import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../../lib/ProtectedRoute";
// import withTracker from "../../lib/withTracker";
import ScrollToTopRoute from "../../lib/ScrollToTopRoute";

import Footer from "../Footer";

import Signup from "../Auth/Signup";
import SignupDone from "../Auth/SignupDone";
import AccountActivation from "../Auth/AccountActivation";
import PasswordReset from "../Auth/PasswordReset";
import PasswordResetDone from "../Auth/PasswordResetDone";
import PasswordResetConfirm from "../Auth/PasswordResetConfirm";

import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Home from "../Home";
import Dashboard from "../Dashboard";

import Campaigns from "../Campaigns";
import Create from "../Campaigns/Create";
import View from "../Campaigns/View";
import List from "../Campaigns/List";

import Stage from "../Stage";

const AppRoutes = props => {
    return (
        <main data-uk-height-viewport="offset-top: true">
        <Switch>
            <ScrollToTopRoute path="/signup" component={(Signup)} />
            <ScrollToTopRoute path="/signup-done" component={(SignupDone)} />
            <ScrollToTopRoute exact path="/account/confirm-email/:key" component={AccountActivation}/>
            <ScrollToTopRoute exact path="/reset/:uid/:token" component={PasswordResetConfirm}/>
            <ScrollToTopRoute path="/reset-password" component={PasswordReset}/>
            <ScrollToTopRoute path="/reset-password-done" component={PasswordResetDone}/>
            <ScrollToTopRoute path="/login" component={(Login)} />
            <ScrollToTopRoute path="/logout" component={(Logout)} />
            <ProtectedRoute path="/dashboard" component={(Dashboard)} />
            <ProtectedRoute path="/campaigns" component={(Campaigns)} />
            <ProtectedRoute exact path="/campaign/create" component={(Create)} />
            <ProtectedRoute path="/campaign/:id" component={(View)} />
            <ProtectedRoute path="/design" component={Stage} />

            <ScrollToTopRoute path="/" component={(Home)} />
        </Switch>
        <Footer />
        </main>
    )
}

export default AppRoutes;
