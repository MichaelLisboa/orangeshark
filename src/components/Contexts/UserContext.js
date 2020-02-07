import React, {useState, useEffect} from 'react';
import history from "../../lib/historyUtils";
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
const UserContext = React.createContext([{}, () => {}]);

async function getToken(refresh) {
    let token = localStorage.getItem("token");
    if (!token) {
        const endpoint = `${AuthUrls.REFRESH}`;
        const result = await axios.post(endpoint, {
                refresh: refresh
            })
        token = await result.data;
    } else {
        console.log("GET USER FROM LOCAL STORAGE")
    }
    return token;
}

const UserProvider = props => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoading, setIsLoading]= useState(true);

    useEffect(
        () => {
            const refresh = localStorage.getItem("refresh");

            if(!token && refresh) {
                getToken(refresh)
                .then(response => {
                    localStorage.setItem("token", response.access);
                    localStorage.setItem("refresh", refresh);
                    setToken(response.access)
                })
                .catch(error => {
                    setIsLoading(false);
                    history.push("/login");
                })
            } else {
                setIsLoading(false);
            }
        }, [token]
    )

    if(isLoading) {
        return (
            <div className="uk-flex uk-flex-middle uk-flex-center uk-height-viewport">
                <p className="uk-h1">Loading</p>
            </div>
        )
    }

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>);
}

export {
    UserContext,
    UserProvider
};
