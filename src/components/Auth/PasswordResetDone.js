import React from "react";
import { Link } from "react-router-dom";

const PasswordResetDone = () =>
    <section className="uk-flex uk-flex-middle" data-uk-height-viewport="offset-top: true">
        <div className="uk-container uk-container-small">
            <div data-uk-scrollspy="cls: uk-animation-fade">
                <p className="uk-h1">Check email</p>
                <p className="uk-text-small">We've sent you an email with<br />instructions to reset your password.</p>
            </div>
            <div className="uk-padding-small uk-text-center" data-uk-scrollspy="cls: uk-animation-fade">
                <Link
                    className="uk-button uk-button-default uk-button-large"
                    to="/login">Go back to login
                </Link>
            </div>
        </div>
    </section>

export default PasswordResetDone;
