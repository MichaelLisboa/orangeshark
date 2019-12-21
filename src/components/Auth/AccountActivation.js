import React, { useEffect, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import axios from "axios";
import history from "../../lib/historyUtils";
import { AuthUrls } from "../../constants/Urls";


const AccountActivation = props => {
    const [user, setUser, token, setToken] = useContext(UserContext);

    useEffect(
        () => {
            token ? history.push("/profile") :  history.push("/login");
            return () => console.log("CLEANUP")
        }, [token, user]
    )

    const activateAccount = () => {
        const { key } = props.match.params;
        const endpoint = AuthUrls.USER_ACTIVATION;
        const data = Object.assign({ key });

        return axios.post(endpoint, data)
            .then((response) => {
                if (response.statusText === "OK") {
                    console.log(response)
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    useEffect(
        () => {
            activateAccount();
        }, []
    )

    return (
        <div />
    );
}

export default AccountActivation;
