import React, { useState, useEffect } from 'react';


import trash from "../../../images/Icons/Trash.png";

const i = [];

const MediaListItem = ({post, selectMedia, selectedItems}) => {
    return (
        <div className="uk-container uk-container-expand">
            <div
                className="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l js-filter"
                data-uk-grid="masonry: true">
                {post.map(item =>
                <div
                    key={item.id}
                    >
                    <div
                        className={`uk-card uk-card-small uk-card-grey uk-box-shadow-medium uk-box-shadow-hover-large ${i.includes(item.image_name) ? "selected-card" : "default-card"}`}>
                        {selectMedia &&
                        <div className="uk-card-header">
                            <div className="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                                <div className="uk-width-expand uk-text-truncate">
                                    <label>
                                    <input
                                        className="uk-checkbox"
                                        type="checkbox"
                                        onChange={() => selectedItems(item.image_name)}
                                        />
                                    <span className="uk-margin-small-left">Choose this image</span>
                                    </label>
                                </div>
                                <div className="uk-width-auto uk-text-right uk-text-muted uk-text-small">
                                    <img style={{maxWidth: "18px"}} alt="trash" src={trash} />
                                </div>
                            </div>
                        </div>
                        }
                        <div className="uk-card-media-top">
                            <img
                                src={`https://app.orangeshark.xyz/custom_images/${item.image_name}`}
                                alt={item.image_display_name}
                                />
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default MediaListItem;
