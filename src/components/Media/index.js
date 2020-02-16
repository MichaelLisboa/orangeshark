import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import { MediaUrls } from "../../constants/Urls";
import GridContent from "./presentation/Grid";
import "./Media.css";

async function getMedia(token) {
    const endpoint = `${MediaUrls.IMAGE_LIST}`;
    const result = await axios.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}


const Media = props => {
    const [token, setToken] = useContext(UserContext);
    const [media, setMedia] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(
        () => {
            getMedia(token)
            .then(response => {
                setMedia(response);
                setIsLoading(false);
            })
            .catch(err => {
                localStorage.removeItem("token");
                setToken();
            })
        }, [setToken, token]
    )

    if (isLoading) {
        return (
            <div className="uk-flex uk-flex-center uk-flex-middle uk-flex-column" data-uk-height-viewport="offset-top: true; offset-bottom: 8">
                <div data-uk-spinner="ratio: 2"></div>
            </div>
        )
    }

    return (
        <div  data-uk-height-viewport="offset-top: true; offset-bottom: 8">
        <GridContent />
        </div>
    );
}

export default Media;
