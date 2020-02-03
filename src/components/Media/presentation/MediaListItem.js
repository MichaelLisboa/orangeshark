import React, { useState, useEffect } from 'react';

import trash from "../../../images/Icons/Trash.png";

const i = [];

const SideBar = ({selectMedia, setSelectMedia, selectedItems, ...props}) => {
    console.log("SIDEBAR PROPS", selectMedia)
    return (
        <aside id="left-col" className="uk-visible@m">
            <div className="left-nav-wrap">
                <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
                    <li>
                        <a href="/#" onClick={(e) => {setSelectMedia(!selectMedia); e.preventDefault()}}>
                            <span data-uk-icon="icon: thumbnails" className="uk-margin-small-right"></span>Select Media</a>
                    </li>
                    <li><a href="/#"><span data-uk-icon="icon: comments" className="uk-margin-small-right"></span>New Campaign</a></li>
                    <li><a href="/#"><span data-uk-icon="icon: album" className="uk-margin-small-right"></span>View Campaigns</a></li>
                </ul>
                <div className="uk-padding-small">
                {selectedItems.length &&
                    <div className="uk-grid-small uk-width-auto" data-uk-grid>
                    {selectedItems.map((item, index) =>
                        <img
                            key={index}
                            style={{maxHeight: "48px", height: "auto"}}
                            src={`https://app.orangeshark.xyz/custom_images/${item}`}
                            alt={item.image_display_name}
                            />
                    )}
                    </div>
                }
                </div>
            </div>
            <div className="bar-bottom">
                <ul className="uk-subnav uk-flex uk-flex-center uk-child-width-1-5" data-uk-grid>
                    <li>
                        <a href="#" className="uk-icon-link" data-uk-icon="icon: home" title="Home" data-uk-tooltip></a>
                    </li>
                    <li>
                        <a href="#" className="uk-icon-link" data-uk-icon="icon: settings" title="Settings" data-uk-tooltip></a>
                    </li>
                    <li>
                        <a href="#" className="uk-icon-link" data-uk-icon="icon: social" title="Social" data-uk-tooltip></a>
                    </li>

                    <li>
                        <a href="#" className="uk-icon-link" data-uk-tooltip="Sign out" data-uk-icon="icon: sign-out"></a>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

const MediaListItem = ({ post, page, next, isLoading, onPaginatedSearch }) => {
    const [selected, setSelected] = useState({});
    const [selectMedia, setSelectMedia] = useState(true);

    const selectedItems = item => {
        i.push(item);
        setSelected(i)
    }

    useEffect(
        () => {
            setSelectMedia(!selectMedia);
        }, [setSelectMedia]
    )

    console.log("SELECTED ITEMS", selected);

    return (
        <>
        <SideBar selectMedia={selectMedia} setSelectMedia={setSelectMedia} selectedItems={selected} />
        <div id="content" data-uk-height-viewport="expand: true">
            <div className="uk-container uk-container-expand">
                <div
                    className="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-3@m uk-child-width-1-4@l js-filter"
                    data-uk-grid="masonry: true">
                    {post.map(item =>
                    <div
                        key={item.id}
                        >
                        <div className="uk-card uk-card-small uk-card-grey uk-box-shadow-medium uk-box-shadow-hover-large">
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
        </div>
    </>
)}
export default MediaListItem
