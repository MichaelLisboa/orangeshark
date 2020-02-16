import React from "react";

import google from "../../../images/Icons/Google.png";
import facebook from "../../../images/Icons/Facebook.png";


const networkOptions = [
    {value: 'google', label:'Google', image: google, color: "#DA6136"},
    {value: 'facebook', label:'Facebook', image: facebook, color: "#56A5DA"}
]

const Network = ({formValues, handleInputChange, adNetwork, setAdNetwork, setMediaType, ...props}) => {

    return (
        <>
        <div>
            <p className="uk-h4 uk-margin-remove">Choose Network</p>
            <p className="uk-text-muted uk-margin-remove">Maximize the ROI of your Ads - choose the world's largest social network and/or the world largest search engine/display network.</p>
        </div>
        <div style={{height: "70%"}} className="uk-flex uk-flex-middle uk-flex-center">
            <div className="uk-width-1-1 uk-grid-collapse uk-child-width-1-2 uk-text-center" data-uk-grid>
            {networkOptions.map((network, index) => (
                <div key={index} className="project-status">
                    <label className="">
                        <input
                            name="ad_network"
                            type="radio"
                            onChange={
                                (e) => {
                                    handleInputChange(e);
                                    setAdNetwork(network.value);
                                    setMediaType();
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
                        <h4
                            style={{color: adNetwork === network.value ? network.color : "#c0c0c0"}}
                            className="uk-margin-small">{network.label}
                        </h4>
                    </label>
                </div>
            ))}
            </div>
        </div>
        </>
    )
}

export default Network;
