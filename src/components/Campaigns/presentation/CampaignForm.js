import React, { useState, useCallback, useEffect, useRef } from "react";
import { Form, Field, FieldArray } from "formik";
import { Wizard, WizardStep } from "../../Wizard";

import google from "../../../images/Icons/Google.png";
import facebook from "../../../images/Icons/Facebook.png";
import carouselImage from "../../../images/Icons/Carousel_image.png";
import carouselVideo from "../../../images/Icons/Carousel_video.png";
import image from "../../../images/Icons/Image.png";
import video from "../../../images/Icons/Video.png";
import text from "../../../images/Icons/Text.png";

const dropzoneStyle = {
  width: "100%",
  height: "100px",
  // padding: "10px",
  borderWidth: 1,
  backgroundColor: "rgba(250, 250, 250, 0.5)",
  borderColor: "rgba(240, 240, 240, 0.75)",
  borderStyle: "solid",
  borderRadius: 4
};

const networkOptions = [
    {value: 'google', label:'Google', image: google, color: "#EC5957"},
    {value: 'facebook', label:'Facebook', image: facebook, color: "#4AB0D7"}
]

const mediaOptions = [
    {type: 'image', label: 'Single Image', image: image},
    {type: 'video', label: 'Single Video', image: video},
    {type: 'carousel_image', label: 'Carousel Image', image: carouselImage},
    {type: 'carousel_video', label: 'Carousel Video', image: carouselVideo},
    {type: 'text', label: 'Text', image: text},
]

const CampaignForm = ({onDrop, acceptedFiles, getRootProps, getInputProps, isDragActive, setAdNetwork, adNetwork, setMediaType, mediaType, serverError, ...props}) => {

    const files = acceptedFiles.map((file, i) => (
        <li key={i}>
            {file.name}-{file.path} - {file.size} bytes
        </li>
    ));

    return (
        <Form className="default-form">
            <fieldset className="uk-fieldset">
                <Wizard formProps={props}>
                    <WizardStep>
                        <div className="uk-h4">
                            Choose Network
                        </div>
                        <div style={{height: "70%"}} className="uk-flex uk-flex-middle uk-flex-center">
                            <FieldArray
                                name="ad_network"
                                render={arrayHelpers => (
                                    <div className="uk-width-1-1 uk-grid-collapse uk-child-width-1-2 uk-text-center" data-uk-grid>
                                    {networkOptions.map((network, index) => (
                                        <div key={index} className="project-status">
                                            <label className="">
                                                <Field
                                                    name="ad_network"
                                                    component="input"
                                                    type="radio"
                                                    onChange={
                                                        () => {
                                                            setAdNetwork(network.value)
                                                        }
                                                    }
                                                    value={network.value}
                                                    checked={adNetwork === network.value}
                                                    className="uk-radio uk-margin-small-right"
                                                />
                                                <img
                                                    src={network.image}
                                                    alt={network.label}
                                                />
                                                <p className="uk-h3 uk-margin-small">{network.label}</p>
                                            </label>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            />
                        </div>
                    </WizardStep>
                    <WizardStep>
                        <div className="uk-h4">
                            Select Campaign Type
                        </div>
                        <div style={{height: "80%"}} className="uk-flex uk-flex-middle uk-flex-center">
                            <FieldArray
                                name="media_type_array"
                                render={arrayHelpers => (
                                    <div className="uk-width-1-1 uk-grid-collapse uk-child-width-1-2 uk-text-center" data-uk-grid>
                                    {mediaOptions.map((media, index) => (
                                        <div key={index} className="uk-padding-small">
                                        <div className="project-status">
                                            <label className="">
                                                <Field
                                                    name="media_type"
                                                    component="input"
                                                    type="radio"
                                                    onChange={
                                                        () => {
                                                            setMediaType(media.type)
                                                        }
                                                    }
                                                    value={media.type}
                                                    checked={mediaType === media.type}
                                                    className="uk-radio uk-margin-small-right"
                                                />
                                                <img
                                                    style={{maxHeight: "56px"}}
                                                    src={media.image}
                                                    alt={media.type}
                                                />
                                                <p className="uk-h5 uk-margin-small">{media.label}</p>
                                            </label>
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                )}
                            />
                        </div>
                    </WizardStep>
                    <WizardStep>
                        <div className="uk-h4">
                            Campaign Details
                        </div>
                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Campaign name
                                {props.errors.campaign_name && props.touched.campaign_name &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left"> {props.errors.campaign_name}</small>
                                }
                            </p>
                            <Field
                                value={props.values.campaign_name}
                                component="input"
                                name="campaign_name"
                                label="Campaign name"
                                placeholder="Campaign name"
                                className={`uk-input uk-form-large ${props.errors.campaign_name && props.touched.campaign_name ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>
                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Headlines
                                {props.errors.headlines && props.touched.headlines &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.headlines}</small>
                                }
                            </p>
                            <Field
                                value={props.values.headlines}
                                component="input"
                                name="headlines"
                                label="Headlines"
                                placeholder="Add some headlines"
                                className={`uk-input uk-form-large ${props.errors.headlines && props.touched.headlines ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Ad text
                                {props.errors.ad_text && props.touched.ad_text &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.ad_text}</small>
                                }
                            </p>
                            <Field
                                value={props.values.ad_text}
                                component="input"
                                name="ad_text"
                                label="Ad text"
                                placeholder="Ad text"
                                className={`uk-input uk-form-large ${props.errors.ad_text && props.touched.ad_text ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Keywords
                                {props.errors.keywords && props.touched.keywords &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.keywords}</small>
                                }
                            </p>
                            <Field
                                value={props.values.keywords}
                                component="input"
                                name="keywords"
                                label="Keywords"
                                placeholder="Keywords"
                                className={`uk-input uk-form-large ${props.errors.keywords && props.touched.keywords ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>
                    </WizardStep>

                    <WizardStep>
                        <div className="uk-h4">
                            Demographics
                        </div>
                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Age groups
                                {props.errors.age_groups && props.touched.age_groups &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.age_groups}</small>
                                }
                            </p>
                            <Field
                                value={props.values.age_groups}
                                component="input"
                                name="age_groups"
                                label="Age groups"
                                placeholder="Age groups"
                                className={`uk-input uk-form-large ${props.errors.age_groups && props.touched.age_groups ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Gender
                                {props.errors.gender && props.touched.gender &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.gender}</small>
                                }
                            </p>
                            <Field
                                value={props.values.gender}
                                component="input"
                                name="gender"
                                label="Gender"
                                placeholder="Gender"
                                className={`uk-input uk-form-large ${props.errors.gender && props.touched.gender ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Languages
                                {props.errors.languages && props.touched.languages &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.languages}</small>
                                }
                            </p>
                            <Field
                                value={props.values.languages}
                                component="input"
                                name="languages"
                                label="Languages"
                                placeholder="Languages"
                                className={`uk-input uk-form-large ${props.errors.languages && props.touched.languages ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>
                    </WizardStep>

                    <WizardStep>
                        <div className="uk-h4">
                            Campaign Links
                        </div>
                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Display links
                                {props.errors.dispaly_links && props.touched.dispaly_links &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.dispaly_links}</small>
                                }
                            </p>
                            <Field
                                value={props.values.dispaly_links}
                                component="input"
                                name="dispaly_links"
                                label="Display links"
                                placeholder="Display links"
                                className={`uk-input uk-form-large ${props.errors.dispaly_links && props.touched.dispaly_links ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Target URLs
                                {props.errors.target_urls && props.touched.target_urls &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.target_urls}</small>
                                }
                            </p>
                            <Field
                                value={props.values.target_urls}
                                component="input"
                                name="target_urls"
                                label="Target URLs"
                                placeholder="Target URLs"
                                className={`uk-input uk-form-large ${props.errors.target_urls && props.touched.target_urls ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>

                        <div className="uk-margin">
                            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
                                Link description
                                {props.errors.link_desc && props.touched.link_desc &&
                                    <small className="uk-display-inline-block uk-text-danger uk-margin-small-left">{props.errors.link_desc}</small>
                                }
                            </p>
                            <Field
                                value={props.values.link_desc}
                                component="input"
                                name="link_desc"
                                label="Link description"
                                placeholder="Link description"
                                className={`uk-input uk-form-large ${props.errors.link_desc && props.touched.link_desc ? "uk-form-danger" : null}`}
                                required
                            />
                        </div>
                    </WizardStep>

                    <WizardStep>
                        <div className="uk-card-header">
                            Upload files
                        </div>
                        <div style={dropzoneStyle} {...getRootProps()}>
                            <input
                                name="images"
                                {...getInputProps()}
                            />
                            {
                                isDragActive ?
                                <p className="uk-padding-small">Drop the files here ...</p> :
                                <p className="uk-padding-small">Drag 'n' drop some files here, or click to select files</p>
                            }

                            { files.length ?
                            <aside>
                                <h4>Files</h4>
                                <ul>{files}</ul>
                            </aside>
                            : null
                          }
                        </div>
                    </WizardStep>
                </Wizard>
            </fieldset>
        </Form>
    )
}

export default CampaignForm;
