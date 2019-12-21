import React from "react";
import { Route, Switch } from "react-router-dom";
import {useTransition, animated} from "react-spring";
import useRouter from "../Hooks/useRouter";
import ProtectedRoute from "../../lib/ProtectedRoute";
// import withTracker from "../../lib/withTracker";

import Home from "../Home";
import Profile from "../Profile";

const ProtectedRoutes = props => {
    const {location} = useRouter();
    const transitions = useTransition(location, location => location.pathname, {
        from: { opacity: 0, transform: 'translate3d(0, 80vh, 0) scale(1)' },
        enter: { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)' },
        leave: { opacity: 0, transform: 'translate3d(0, -50vh, 0) scale(1)' },
    });

    return transitions.map(({item, props, key}) => (
        <animated.div id="PageContainer" key={key} style={props}>
            <Switch location={item}>
                <ProtectedRoute path="/profile" component={(Profile)} />
                <ProtectedRoute path="/" component={(Home)} />
            </Switch>
        </animated.div>
    )
)}

export default ProtectedRoutes;
