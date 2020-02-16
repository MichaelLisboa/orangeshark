import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { MediaUrls } from "../../../constants/Urls";

const i = [];

const Sidebar = ({toggle, selectMedia, setSelectMedia, selectedItems}) => {
    console.log("SIDEBAR PROPS", toggle, selectMedia, selectedItems);

    const [media, setMedia] = useState([]);

    const getUploadParams = async ({file, meta }) => {
        const endpoint = MediaUrls.IMAGE_UPLOAD;
        const token = localStorage.getItem("token");
        const body = new FormData();
        body.append('image_file', file);

        const postData = {
            url: endpoint,
            body: body,
            headers: {
                Authorization: `Bearer ${token}`
            },
            meta: {image_file: file.name}
        }
        return postData
    }

    const handleChangeStatus = (fileWithMeta, status) => {
        const endpoint = MediaUrls.IMAGE_LIST;
        const token = localStorage.getItem("token");
        if (status === 'done') {
            const response = JSON.parse(fileWithMeta.xhr.response);
            i.push(response.image_name);
            setMedia(i);
            // return axios({
            //     method: "GET",
            //     url: endpoint,
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // })
            // .then((response) => {
            //     console.log("LIST IMAGES", response)
            //     // history.push(`/campaign/${response.data.id}`);
            // })
        } else if (status === 'error_upload') {
            // You can play around with fileWithMeta.xhr here and should work.
            console.log("ERROR", fileWithMeta.xhr.responseText)
        }
    }

    // receives array of files that are done uploading when submit button is clicked
    const handleUpload = (files, allFiles) => {
        // console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

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
                    <li>
                        <NavLink
                            to={`/campaigns`}>
                            <span data-uk-icon="icon: album" className="uk-margin-small-right"></span> View Campaigns
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/campaign/create`}>
                            <span data-uk-icon="icon: comments" className="uk-margin-small-right"></span> New Campaign
                        </NavLink>
                    </li>
                </ul>

                <form className="default-form">
                    <Dropzone
                        getUploadParams={getUploadParams}
                        onChangeStatus={handleChangeStatus}
                        onSubmit={handleUpload}
                        accept="image/*,video/*"
                        submitButtonDisabled="true"
                    />
                </form>

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
