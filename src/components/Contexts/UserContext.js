import React, {useState, useEffect} from 'react';
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
const UserContext = React.createContext([{}, () => {}]);

async function getToken(refresh) {
    let token = localStorage.getItem("token");
    if (!token) { // IF NOT SEND REQUEST TO API
        console.log("QUERY FOR USER", localStorage.refresh, token)
        const endpoint = `${AuthUrls.REFRESH}`; // THE API URL ENDPOINT
        const result = await axios.post(endpoint, {
                refresh: refresh
            })
        console.log("RESULT", result.data)
        token = await result.data; // THE RESULT FROM API
    } else {
        console.log("GET USER FROM LOCAL STORAGE")
    }
    return token;
}

const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(
        () => {
            const refresh = localStorage.getItem("refresh");
            if(!token && refresh) {
                getToken(refresh)
                .then(response => {
                    console.log("PROVIDER", response)
                    // localStorage.setItem("user", JSON.stringify(response));
                    // setUser(response)
                })
                .catch(error => {
                    console.log("GET USER ERROR", error.response)
                    const refresh = localStorage.refresh;
                    // setUser(JSON.parse(localStorage.getItem("user")))
                    console.log("TOKEN REFRESH", refresh)
                    axios.post(AuthUrls.REFRESH, {refresh: refresh})
                    .then((response) => {
                        console.log("REFRESH TOKEN RESPONSE", response)
                        localStorage.setItem("token", response.data.access);
                        localStorage.setItem("refresh", refresh);
                    })
                })
            } else {
                const refresh = localStorage.refresh;
                // setUser(JSON.parse(localStorage.getItem("user")))
            }
        }, [token]
    )

    return (
        <UserContext.Provider value={[token, setToken]}>
            {props.children}
        </UserContext.Provider>);
}

export {
    UserContext,
    UserProvider
};
