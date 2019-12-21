import React, { useState, useEffect, useRef } from "react";
import { Form, Field } from "formik";
import {ModalDatePickerWithFormik} from "../../DatePicker/DatePickerWithFormik";

const toggleCalendar = (e) => {
    e && e.preventDefault()
    // this.setState({isOpen: !this.state.isOpen})
}

const CampaignForm = ({serverError, ...props}) => {
    const [nameCount, setNameCount] = useState(20);
    const [briefCount, setBriefCount] = useState(20);
    const [infoCount, setInfoCount] = useState(20);
    const [key, setKey] = useState(null);

    const wordCounter = (e, count) => {
        const countDown = e.split(" ").length-1;
        if (count==="name") {
            setNameCount(20 - countDown);
        } else if (count==="brief") {
            setBriefCount(20 - countDown);
        } else {
            setInfoCount(20 - countDown);
        }
        return countDown;
    }

    return (
        <Form className="default-form">
            <fieldset className="uk-fieldset">
                <div className="uk-position-relative uk-margin">
                    <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                        Describe your campaign in <span className="uk-h5">{nameCount-1 === 0 ? "0" : nameCount} words</span> or less.
                        {props.errors.name && props.touched.name &&
                            <small className="uk-display-inline-block uk-text-danger">{props.errors.name}</small>
                        }
                    </p>
                    <Field
                        onChange={e => {
                            if(key === 13) {
                                props.value = e.currentTarget.value.replace(/[\r\n\v]+/g, "");
                                return;
                            }
                            if(e.target.value && key !== 8 && nameCount === 0) {
                                props.value = e.currentTarget.value;
                                return
                            }

                            props.handleChange(e);
                            wordCounter(e.currentTarget.value, "name");
                        }}
                        onKeyDown={e => setKey(e.keyCode)}
                        id="CampaignName"
                        value={props.values.name}
                        component="textarea"
                        name="name"
                        label="Campaign name"
                        placeholder="Required: Write a short description of your campaign."
                        rows="4"
                        className={`big-text-field uk-textarea uk-form-large uk-border-rounded ${props.errors.name && props.touched.name ? "uk-form-danger" : null}`}
                        required
                    />
                    <small style={{margin: "5px"}} className="uk-position-bottom-right uk-text-danger">{nameCount <= 1 ? "20" : Math.abs(nameCount-20)} words</small>
                </div>


                <div className="uk-position-relative uk-margin">
                    <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                        What services are you seeking in <span className="uk-h5">{briefCount-1 === 0 ? "0" : briefCount} words</span> or less?
                    </p>
                    <Field
                        onChange={e => {
                            if(key === 13) {
                                props.value = e.currentTarget.value.replace(/[\r\n\v]+/g, "");
                                return;
                            }
                            if(e.target.value && key !== 8 && briefCount === 0) {
                                props.value = e.currentTarget.value;
                                return
                            }

                            props.handleChange(e);
                            wordCounter(e.currentTarget.value, "brief");
                        }}
                        onKeyDown={e => setKey(e.keyCode)}
                        id="CampaignName"
                        value={props.values.brief}
                        component="textarea"
                        name="brief"
                        label="Campaign name"
                        placeholder="Optional: Tell us a little about what you're seeking (services, skills, etc)."
                        rows="4"
                        className={`big-text-field uk-textarea uk-form-large uk-border-rounded ${props.errors.brief && props.touched.brief ? "uk-form-danger" : null}`}
                        required
                    />
                    <small style={{margin: "5px"}} className="uk-position-bottom-right uk-text-danger">{briefCount <= 1 ? "20" : Math.abs(briefCount-20)} words</small>
                </div>


                <div className="uk-position-relative uk-margin">
                    <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                        Add any additional info in <span className="uk-h5">{infoCount-1 === 0 ? "0" : infoCount} words</span> or less.
                    </p>
                    <Field
                        onChange={e => {
                            if(key === 13) {
                                props.value = e.currentTarget.value.replace(/[\r\n\v]+/g, "");
                                return;
                            }
                            if(e.target.value && key !== 8 && infoCount === 0) {
                                props.value = e.currentTarget.value;
                                return
                            }

                            props.handleChange(e);
                            wordCounter(e.currentTarget.value, "info");
                        }}
                        onKeyDown={e => setKey(e.keyCode)}
                        id="CampaignName"
                        value={props.values.info}
                        component="textarea"
                        name="info"
                        label="Campaign name"
                        placeholder="Optional: Provide more information (goals, markets, etc)."
                        rows="4"
                        className={`big-text-field uk-textarea uk-form-large uk-border-rounded ${props.errors.info && props.touched.info ? "uk-form-danger" : null}`}
                        required
                    />
                    <small style={{margin: "5px"}} className="uk-position-bottom-right uk-text-danger">{infoCount <= 1 ? "20" : Math.abs(infoCount-20)} words</small>
                </div>

                <div className="uk-grid-collapse uk-width-1-1" data-uk-grid onClick={toggleCalendar}>
                    {((props.errors.start_date && props.touched.start_date) || (props.errors.end_date && props.touched.end_date)) &&
                        <small className="uk-text-danger uk-width-1-1 uk-padding-remove-vertical uk-margin-remove-vertical">
                            Set your campaign start and end dates.
                        </small>
                    }
                    <h5 className="uk-width-1-1 uk-margin-small uk-text-center uk-text-small uk-heading-line"><span>Start &amp; End</span></h5>
                    <div className="uk-margin-small uk-margin-auto-left uk-margin-auto-right">
                        <Field
                            style={{borderStyle: "none"}}
                            component={ModalDatePickerWithFormik}
                            name="DatePickerWithFormik"
                            required
                          />
                    </div>
                </div>
                <hr className="uk-margin-medium-bottom" />


                <div className="uk-margin-large-bottom">
                    <button
                        type="submit"
                        disabled={props.isSubmitting || !props.isValid}
                        className="uk-button uk-button-large uk-button-default uk-align-center">
                        Save Campaign
                    </button>
                </div>
            </fieldset>
        </Form>
    )
}

export default CampaignForm;
