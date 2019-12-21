import React, {useState} from "react"
import { Form, Field } from "formik";

const ProfileForm = ({...props}) => {
    const [count, setCount] = useState(20);
    const [key, setKey] = useState(null);

    const wordCounter = e => {
        const countDown = e.split(" ").length-1;
        setCount(20 - countDown);
        return countDown;
    }

    return (
        <Form className="default-form">
            <fieldset className="uk-fieldset">
                <div className="uk-text-center">
                    <p className="uk-text-meta uk-display-inline">Your story in</p>
                    <p className="brand-text uk-h1 uk-display-inline"> {count >= 1 ? (count === 20 ? "20" : Math.abs(count-1)) : 0} </p>
                    <p className="uk-text-meta uk-display-inline">words or less.</p>
                </div>
                <div className=" uk-position-relative uk-margin">
                    {props.errors.bio && props.touched.bio && <small className="uk-text-danger">{props.errors.bio}</small>}
                    <Field
                        onChange={e => {
                            if(e.target.value && key !== 8 && count === 0) {
                                props.value = e.target.value;
                                return
                            }

                            props.handleChange(e);
                            wordCounter(e.target.value);
                        }}
                        onKeyDown={e => setKey(e.keyCode)}
                        component="textarea"
                        name="bio"
                        label="What's your story?"
                        rows="8"
                        placeholder="What's your story? This could be anything about you or what you're seeking."
                        className={`big-text-field uk-textarea uk-form-large uk-border-rounded ${props.errors.bio && props.touched.bio ? "uk-form-danger" : null}`}
                        required
                    />
                    <small style={{margin: "5px"}} className="uk-position-bottom-right uk-text-danger">{count >= 1 ? (count === 20 ? "20" : Math.abs(count-1)) : 0} words left</small>
                </div>

                <div className="uk-margin-large-bottom">
                    <button
                        type="submit"
                        disabled={props.isSubmitting || !props.isValid}
                        className="uk-button uk-button-default uk-align-center">
                        Next <span data-uk-icon="icon: arrow-right" />
                    </button>
                </div>
            </fieldset>
        </Form>
    )
}


export default ProfileForm;
