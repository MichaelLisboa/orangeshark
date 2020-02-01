import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import useRouter from "../Hooks/useRouter";

const OffCanvas = () => {
    const {location} = useRouter();
    return (
        <div id="offcanvas-nav" data-uk-offcanvas="mode: push; overlay: true; flip: true">
            <div className="uk-offcanvas-bar uk-flex uk-flex-column uk-background-secondary">
                <button className="uk-offcanvas-close uk-close" type="button" data-uk-close></button>
                <ul className="uk-nav uk-nav-primary uk-margin-auto-vertical">
                    {location.pathname !== '/' &&
                    <li>
                        <NavLink data-uk-toggle="target: #offcanvas-nav" to={`/`}>
                            Home
                        </NavLink>
                    </li>
                    }
                    <li>
                        <NavLink data-uk-toggle="target: #offcanvas-nav" to={`/campaigns`}>
                            My Campaigns
                        </NavLink>
                    </li>
                    <li>
                        <NavLink data-uk-toggle="target: #offcanvas-nav" to={`/media`}>
                            My Media
                        </NavLink>
                    </li>
                    <li>
                        <NavLink data-uk-toggle="target: #offcanvas-nav" to={`/logout`}>
                            Logout
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default OffCanvas;
