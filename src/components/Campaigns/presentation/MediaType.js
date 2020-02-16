import React from "react";

import carouselImage from "../../../images/Icons/Carousel_image.png";
import carouselVideo from "../../../images/Icons/Carousel_video.png";
import image from "../../../images/Icons/Image.png";
import video from "../../../images/Icons/Video.png";
import text from "../../../images/Icons/Text.png";


const mediaOptions = [
    {type: 'image', label: 'Single Image', image: image, color: "#8CB954"},
    {type: 'video', label: 'Single Video', image: video, color: "#56A5DA"},
    {type: 'carousel_image', label: 'Carousel Image', image: carouselImage, color: "#DA6136"},
    {type: 'carousel_video', label: 'Carousel Video', image: carouselVideo, color: "#7666A8"},
    {type: 'text', label: 'Text', image: text, color: "#F1B844"},
]

const MediaType = ({formValues, handleInputChange, setMediaType, mediaType, adNetwork, ...props}) => {

    return (
        <>
            <div className="uk-h4">
                Select Campaign Type
            </div>
            <div style={{height: "80%"}} className="uk-flex uk-flex-middle uk-flex-center">
                <div className="uk-width-1-1 uk-grid-collapse uk-child-width-1-2 uk-text-center" data-uk-grid>
                    {mediaOptions
                        .filter(m => (m.type !== 'text' && adNetwork === 'facebook') || adNetwork === 'google')
                        .map((media, index) => (
                        <div key={index} className="uk-padding-small">
                        <div className="project-status">
                            <label className="">
                                <input
                                    name="media_type"
                                    type="radio"
                                    onChange={
                                        (e) => {
                                            handleInputChange(e);
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
                                <h6
                                    style={{color: mediaType === media.type ? media.color : "#c0c0c0"}}
                                    className="uk-margin-remove uk-padding-small">
                                    {media.label}
                                </h6>
                            </label>
                        </div>
                        </div>
                    ))}
                    </div>
            </div>
        </>
    )
}

export default MediaType;
