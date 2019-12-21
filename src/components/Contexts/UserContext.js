import React, {useState, useEffect} from 'react';
import axios from "axios";
import {AuthUrls} from "../../constants/Urls";
const UserContext = React.createContext([{}, () => {}]);

async function getUser(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        console.log("QUERY FOR USER")
        const endpoint = AuthUrls.USER_PROFILE;
        const result = await axios.get(endpoint, {
                headers: {
                    authorization: `Token ${token}`
                }
            })
        user = await result.data;
    } else {
        console.log("GET USER FROM LOCAL STORAGE")
    }
    return user;
}

const UserProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

    useEffect(
        () => {
            if(token) {
                getUser(token)
                .then(response => {
                    localStorage.setItem("user", JSON.stringify(response));
                    setUser(response)
                })
                .catch(error => {
                    console.log("GET USER ERROR", error.response)
                })
            } else {
                setUser(JSON.parse(localStorage.getItem("user")))
            }
        }, [token]
    )

    if(token && !user) return null;

    return (
        <UserContext.Provider value={[user, setUser, token, setToken]}>
            {props.children}
        </UserContext.Provider>);
}

export {
    UserContext,
    UserProvider
};
