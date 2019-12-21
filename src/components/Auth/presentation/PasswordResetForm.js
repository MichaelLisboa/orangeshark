import React from "react";
import { Form, Field } from "formik";

const PasswordResetForm = ({serverError, ...props}) => {
    return (
        <Form
            className="default-form uk-width-1-1"
            >
            <fieldset className="uk-fieldset">
                <div className="uk-margin">
                    {props.errors.email && props.touched.email &&
                        <small className="uk-text-danger">{props.errors.email}</small>
                    }
                    <Field
                        name="email"
                        label="Email address"
                        placeholder="Email address"
                        className={`uk-input uk-form-large uk-border-rounded ${props.errors.email && props.touched.email ? "uk-form-danger" : null}`}
                        autoComplete="off"
                        autoCapitalize="off"
                        autoCorrect="off"
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
                            Reset password
                    </button>
                </div>
            </fieldset>
        </Form>
    )
}

export default PasswordResetForm;
