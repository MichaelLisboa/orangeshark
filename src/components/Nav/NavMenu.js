import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";
import useRouter from "../Hooks/useRouter";
import logo from "../../images/logo.png";
import account from "../../images/Icons/Account.png";

const NavMenu = () => {
    const {location} = useRouter();
    const [user, setUser, token, setToken] = useContext(UserContext);

    return (
        <div className="nav"
            data-uk-sticky="cls-active: uk-background-default uk-box-shadow-medium;">
            <div className="uk-container uk-container-expand uk-padding-remove">
                <nav className="uk-navbar uk-navbar-container uk-navbar-transparent" data-uk-navbar>
                    <div className="uk-navbar-left">
                        <div className="uk-navbar-item uk-padding-small">
                            {location.pathname === '/' && location.pathname !== '/profile' ?
                            <img src={logo} alt="Logo" data-uk-image />
                            :
                            <Link to={`/`}>
                                <img src={logo} alt="Logo" data-uk-image />
                            </Link>
                            }
                        </div>
                    </div>
                    {token && user ?
                    <div className="uk-navbar-right">
                        <ul className="app-nav uk-navbar-nav uk-visible@m">
                            {location.pathname !== '/' && location.pathname !== '/profile' &&
                                <li>
                                    <Link
                                        to={`/`}>
                                            <span className="uk-icon uk-margin-small-right" data-uk-icon="icon: home; ratio: 0.85"></span> Home
                                    </Link>
                                </li>
                            }
                            <li>
                                <NavLink
                                    to={`/campaigns`}>My Campaigns
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/media`}>My Media
                                </NavLink>
                            </li>
                        </ul>
                        <ul className="uk-navbar-nav uk-visible@m">
                            <li>
                                <NavLink
                                    to={`/profile`}>
                                    <img
                                        src={account}
                                        alt="Go to profile"
                                        className="profile-icon"
                                        data-uk-img
                                        />
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to={`/logout`}>Log out
                                </NavLink>
                            </li>
                        </ul>

                        <a className="uk-navbar-toggle uk-hidden@m" href="#offcanvas-nav" data-uk-toggle="target: #offcanvas-nav">
                            <span className="uk-float-left" data-uk-icon="icon: menu; ratio: 1" />
                            <small className="uk-float-left">&nbsp;MENU</small>
                        </a>
                    </div>
                    :
                    <div className="uk-navbar-right">
                        <ul className="app-nav uk-navbar-nav uk-visible@m">
                            <li className="uk-margin-right">
                                <NavLink
                                    to={`/login`}>
                                    <span className="uk-margin-small-right" data-uk-icon="icon: user" />
                                    Sign In
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={`/signup`}>
                                    <span className="uk-margin-small-right" data-uk-icon="icon: sign-in" />
                                    Sign Up
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                }
                </nav>
            </div>
        </div>
    )
}

export default NavMenu;
