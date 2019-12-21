import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "../../lib/ProtectedRoute";
// import withTracker from "../../lib/withTracker";

import Signup from "../Auth/Signup";
import SignupDone from "../Auth/SignupDone";
import AccountActivation from "../Auth/AccountActivation";
import PasswordReset from "../Auth/PasswordReset";
import PasswordResetDone from "../Auth/PasswordResetDone";
import PasswordResetConfirm from "../Auth/PasswordResetConfirm";

import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import Home from "../Home";
import Profile from "../Profile";
import EditProfile from "../Profile/EditProfile";

import Campaigns from "../Campaigns";
import Create from "../Campaigns/Create";
import View from "../Campaigns/View";
import List from "../Campaigns/List";

import ViewUser from "../Users";

import Stage from "../Stage";

const AppRoutes = props => {
    return (
        <Switch>
            <Route path="/signup" component={(Signup)} />
            <Route path="/signup-done" component={(SignupDone)} />
            <Route exact path="/account/confirm-email/:key" component={AccountActivation}/>
            <Route exact path="/reset/:uid/:token" component={PasswordResetConfirm}/>
            <Route path="/reset-password" component={PasswordReset}/>
            <Route path="/reset-password-done" component={PasswordResetDone}/>
            <Route path="/login" component={(Login)} />
            <Route path="/logout" component={(Logout)} />
            <ProtectedRoute path="/profile/edit/:id" component={(EditProfile)} />
            <ProtectedRoute path="/profile" component={(Profile)} />
            <ProtectedRoute path="/campaigns" component={(Campaigns)} />
            <ProtectedRoute exact path="/campaign/create" component={(Create)} />
            <ProtectedRoute path="/campaign/:id" component={(View)} />
            <ProtectedRoute path="/user/:id" component={(ViewUser)} />
            <ProtectedRoute path="/design" component={Stage} />

            <Route path="/" component={(Home)} />
        </Switch>
    )
}

export default AppRoutes;
