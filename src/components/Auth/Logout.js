import React, { useEffect, useContext } from "react";
import history from "../../lib/historyUtils";
import { UserContext } from "../Contexts/UserContext";

const Logout = props => {
    const [token, setToken] = useContext(UserContext);

    useEffect(
        () => {
            setToken();
            const timer = setTimeout(() => localStorage.clear(), 200);
            history.push("/login");
        }, [setToken]
    )
    return (
        <div />
    );
}

export default Logout;
