import React, { useState, useEffect } from 'react';

const Sidebar = ({toggle, selectMedia, setSelectMedia, selectedItems}) => {
    console.log("SIDEBAR PROPS", toggle, selectMedia, selectedItems)
    return (
        <aside id="left-col" className="uk-visible@m">
            <div className="left-nav-wrap">
                <ul className="uk-nav uk-nav-default uk-nav-parent-icon" data-uk-nav>
                    <li>
                        <a href="/#" onClick={(e) => {toggle(); e.preventDefault()}}>
                            <span data-uk-icon="icon: thumbnails" className="uk-margin-small-right"></span>
                                {!selectMedia ? "Select Media" : "Deselect Media"}
                            </a>
                    </li>
                    <li><a href="/#"><span data-uk-icon="icon: comments" className="uk-margin-small-right"></span>New Campaign</a></li>
                    <li><a href="/#"><span data-uk-icon="icon: album" className="uk-margin-small-right"></span>View Campaigns</a></li>
                </ul>
                <div className="uk-padding-small">
                {selectedItems && selectMedia &&
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

export default Sidebar;
