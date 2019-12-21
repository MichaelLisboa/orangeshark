import React , {useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import history from "../../../utils/historyUtils";
import { AuthUrls } from "../../../constants/Urls";
import Avatar from "./AvatarDisplay";

const AvatarForm = props => {
    const [avatar, setAvatar] = useState(JSON.parse(localStorage.user).profile.profile_pic);

    const handleImageChange = e => {
        const token = localStorage.token;
        const form_data = new FormData();
        const url = AuthUrls.USER_AVATAR;

        form_data.append("profile_pic", e.target.files[0], e.target.files[0].name);

        axios.patch(url, form_data, {
            mode: "cors",
            headers: {
                authorization: `Token ${token}`,
                "content-type": "multipart/form-data"
            }
        })
        .then(response => {
            const user = JSON.parse(localStorage.user);
            user.profile.profile_pic = response.data.image;
            localStorage.setItem("user", JSON.stringify(user));
            setAvatar(response.data.image);
            history.location.pathname !== "/profile-setup" && history.push("/");
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className={props.className}>
            <Avatar className={`profile-image-circle avatar-form`} user={props.user} image={avatar} />
            <form className="js-upload uk-form-custom">
                <input
                    type="file"
                    id="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange} />
                <button className="uk-button uk-button-primary" type="button">Change picture</button>
            </form>
        </div>
    )
}

AvatarForm.propTypes = {
    className: PropTypes.any,
    user: PropTypes.object,
};

export default AvatarForm;
