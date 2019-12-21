import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import history from "../../lib/historyUtils";

const Home = props => {
    const [user,,token,] = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        () => {
            if(token && user) {
                console.log("USER", user)
                console.log("TOKEN", token)
                history.push("/profile");
            } else {
                setIsLoading(false);
            }
        }, [token, user]
    )

    if(isLoading) {
        return (
            <div />
        )
    }

    return (
        <section className="uk-section">
            <div className="uk-container uk-container-small">
                <h1 className="uk-text-center">Home</h1>
                <div className="uk-child-width-auto@s uk-text-center" data-uk-grid>
                    <Link
                        to="/login"
                        className="uk-button uk-button-large uk-button-default">
                        Sign in
                    </Link>
                    <Link
                        to="/signup"
                        className="uk-button uk-button-large uk-button-default uk-margin-small-left">
                        Sign up
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home;
