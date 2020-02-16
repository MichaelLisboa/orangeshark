import React, { useState, useReducer, useEffect, useRef, useContext } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { MediaUrls } from "../../../constants/Urls";

const i = [];

const MediaUpload = ({setMedia, ...props}) => {

    const [files, dispatchFiles] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, { id: state.length, name: action.name }];
            case "remove":
                const items = () => {
                    const filter = state.map(item => item.name).filter(name => name === action.name);
                    return filter[0];
                }
                return state.filter((name, index) => name.name !== items());
            default:
                return state;
        }
    }, []);

    // specify upload params and url for your files
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
        if (status === 'done') {
            const response = JSON.parse(fileWithMeta.xhr.response);
            // i.push(response.image_name);
            dispatchFiles({
                type: "add",
                name: response.image_name
            });
        } else if (status === 'removed') {
            dispatchFiles({
                type: "remove",
                name: JSON.parse(fileWithMeta.xhr.response).image_name
            });
        } else if (status === 'error_upload') {
            // You can play around with fileWithMeta.xhr here and should work.
            console.log("ERROR", fileWithMeta.xhr.responseText)
        }
    }

    useEffect(
        () => {
            setMedia(files.map(item => item.name.trim()));
        }, [files, setMedia]
    )

    // receives array of files that are done uploading when submit button is clicked
    const handleUpload = (files, allFiles) => allFiles.forEach(f => f.remove())

    return (
    <>
        <div className="uk-card-header">
            Upload files
        </div>
        <Dropzone
            getUploadParams={getUploadParams}
            onChangeStatus={handleChangeStatus}
            onSubmit={handleUpload}
            accept="image/*,video/*"
            submitButtonDisabled="true"
        />
    </>
    )
}

export default MediaUpload;
