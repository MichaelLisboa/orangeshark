import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import history from "../../lib/historyUtils";

import "./Home.css";

const Home = props => {
    const [token, setToken] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        () => {
            if(token) {
                history.push("/dashboard");
            } else {
                setIsLoading(false);
            }
        }, [token]
    )

    if(isLoading) {
        return (
            <div />
        )
    }

    return (
        <section
            className="wrap uk-background-norepeat uk-background-cover uk-background-center-center uk-cover-container uk-background-secondary">
            <img
                src="https://picsum.photos/640/700/?image=482"
                alt="Welcome to orangeShark"
                data-uk-cover
                data-uk-img
            />
            <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-position-z-index uk-position-relative" data-uk-height-viewport="offset-bottom: 18">
                <h1 className="uk-text-center uk-light">Home</h1>
                <div className="uk-flex uk-flex-center">
                    <div className="uk-grid-small" data-uk-grid>
                        <div>
                            <Link
                                to="/login"
                                className="uk-button uk-button-large uk-button-primary uk-border-rounded">
                                Sign in
                            </Link>
                        </div>
                        <div>
                            <Link
                                to="/signup"
                                className="uk-button uk-button-large uk-button-primary uk-border-rounded">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home;
