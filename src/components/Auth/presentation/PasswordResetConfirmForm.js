import React from "react";
import { Form, Field } from "formik";

const PasswordResetForm = ({serverError, ...props}) => {
    return (
        <Form
            className="default-form uk-width-1-1"
            >
            <fieldset className="uk-fieldset">
                <div className="uk-margin">
                    {props.errors.new_password1 && props.touched.new_password1 &&
                        <small className="uk-text-danger">{props.errors.new_password1}</small>
                    }
                    <Field
                        name="new_password1"
                        label="New password"
                        type="password"
                        placeholder="New password"
                        className={`uk-input uk-form-large uk-border-rounded ${props.errors.new_password1 && props.touched.new_password1 ? "uk-form-danger" : null}`}
                        required
                    />
                </div>
                <div className="uk-margin">
                    {props.errors.new_password2 && props.touched.new_password2 &&
                        <small className="uk-text-danger">{props.errors.new_password2}</small>
                    }
                    <Field
                        name="new_password2"
                        label="Confirm new password"
                        type="password"
                        placeholder="Confirm new password"
                        className={`uk-input uk-form-large uk-border-rounded ${props.errors.new_password2 && props.touched.new_password2 ? "uk-form-danger" : null}`}
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
