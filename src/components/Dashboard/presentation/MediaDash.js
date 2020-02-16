import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";
import { MediaUrls } from "../../../constants/Urls";


async function getMedia(token, page) {
    const endpoint = `${MediaUrls.IMAGE_LIST}`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const MediaDash = props => {
    const [token, setToken] = useContext(UserContext);
    const [media, setMedia] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(
        () => {
            getMedia(token)
            .then(response => {
                setMedia(response.results);
                setIsLoading(false);
            })
            .catch(err => {
                console.log("GET DASHBOARD ERROR", err)
            })
        }, []
    )

    return (
        <div className="uk-margin-xlarge-bottom">
            <div className="uk-grid-collapse uk-padding-small uk-padding-remove-bottom uk-margin-small-bottom uk-margin-large-top" data-uk-grid>
                <div className="uk-width-expand">
                    <h6 className="uk-text-uppercase">Your Latest Media Uploads</h6>
                </div>
            </div>
            <div className="uk-card uk-card-default uk-card-small">
                <div style={{height: "250px"}} className="uk-card-body">
                {isLoading ?
                    <div className="uk-height-1-1 uk-flex uk-flex-middle uk-flex-center">
                        <div data-uk-spinner></div>
                    </div>
                :
                    <div className="image-grid" data-uk-lightbox="animation: fade">
                    {media.map((item, index) =>
                        <a
                            key={index}
                            href={`https://app.orangeshark.xyz/custom_images/${item.image_name}`}
                            data-alt={item.image_display_name}
                            data-caption={item.image_display_name}
                        >
                            <img
                                src={`https://app.orangeshark.xyz/custom_images/${item.image_name}`}
                                alt={item.image_display_name}
                                />
                        </a>
                    )}
                    </div>
                }
                </div>
                <div className="uk-card-footer">
                    <Link className="uk-button uk-button-large uk-button-primary" to="/media">See all media</Link>
                </div>
            </div>
        </div>
    );
}

export default MediaDash;
