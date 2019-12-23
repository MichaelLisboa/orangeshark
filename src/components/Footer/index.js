import React from "react";
import moment from "moment";
import logo from  "../../images/logo-strap.png";

const Footer = props =>
    <footer id="page-footer"
        className={`${props.className} uk-container uk-container-expand uk-section-secondary`}>
        <div className="uk-padding-small" data-uk-grid >
            <div className="uk-width-1-2">
                <img
                    src={logo}
                    alt="OrangeShark logo"
                    width="80"
                    data-uk-img />
            </div>
            <div className="uk-width-expand uk-flex uk-flex-right uk-flex-middle">
                <small className="small-meta">&copy; {moment().format('YYYY')}. ARR. <a href="https://www.orangeshark.xyz">orangeShark</a></small>
            </div>
        </div>
    </footer>

export default Footer;
