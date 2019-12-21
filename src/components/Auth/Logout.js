import React, { useEffect, useContext } from "react";
import history from "../../lib/historyUtils";
import { UserContext } from "../Contexts/UserContext";

const Logout = props => {
    const [user, setUser, token, setToken] = useContext(UserContext);

    useEffect(
        () => {
            setToken();
            setUser({});
            const timer = setTimeout(() => localStorage.clear(), 200);
            history.push("/login");
        }, [setToken, setUser]
    )
    return (
        <div />
    );
}

export default Logout;
