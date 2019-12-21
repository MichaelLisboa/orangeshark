import React from "react";
import { Form, Field } from "formik";

const LoginForm = ({serverError, ...props}) => {
    return (
        <Form
            style={{maxWidth: "500px"}}
            className="default-form"
            >
            <div className="uk-margin">
                {props.errors.email && props.touched.email &&
                    <small className="uk-text-danger">{props.errors.email}</small>
                }
                <Field
                    name="email"
                    label="Email"
                    placeholder="Email"
                    className={`uk-input uk-form-large uk-border-rounded ${props.errors.email && props.touched.email ? "uk-form-danger" : null}`}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    required
                />
            </div>
            <div className="uk-margin">
                {props.errors.password && props.touched.password &&
                    <small className="uk-text-danger">{props.errors.password}</small>
                }
                <Field
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    className={`uk-input uk-form-large uk-border-rounded ${props.errors.password && props.touched.password ? "uk-form-danger" : null}`}
                    required
                />
            </div>

            {serverError &&
                <div className="uk-background-muted uk-margin-small uk-padding-small uk-width-1-1">
                {serverError.map((error, i) =>
                    <span className="uk-text-small uk-text-danger uk-display-block" key={`error-${i}`}>{error}</span>
                )}
                </div>
            }

            <div className="uk-container uk-container-small uk-text-center">
                <button
                    type="submit"
                    disabled={props.isSubmitting || !props.isValid}
                    className="uk-button uk-button-default">
                        Sign in
                </button>
            </div>
        </Form>
    )
}

export default LoginForm;
