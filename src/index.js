import React from "react";
import { render } from "react-dom";
import { Router } from "react-router-dom";
import history from "./lib/historyUtils";
import App from "./components/App";
import {UserProvider} from "./components/Contexts/UserContext";
import { DefaultToast, ToastProvider } from "react-toast-notifications";
import * as serviceWorker from "./serviceWorker";


export const MyCustomToast = ({ children, ...props }) => (
    <div className="uk-margin-large-bottom">
        <DefaultToast style={{maxWidth: "90%", marginLeft: "auto", marginRight: "auto"}} {...props}>
            {children}
        </DefaultToast>
    </div>
);

render (
    <UserProvider>
        <ToastProvider
            placement="bottom-center"
            components={{ Toast: MyCustomToast }}
            autoDismissTimeout="3000"
            >
            <Router history={history} basename={process.env.PUBLIC_URL}>
                <App />
            </Router>
        </ToastProvider>
    </UserProvider>
    , document.getElementById('root'),
)

serviceWorker.unregister();
