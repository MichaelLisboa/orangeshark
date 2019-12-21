import React, { useState, useEffect, useContext } from "react"
import axios from "axios";
import { AuthUrls } from "../../constants/Urls";
import { UserContext } from "../Contexts/UserContext";
import history from "../../lib/historyUtils";
import { Formik } from "formik";
import * as Yup from "yup";
import ProfileForm from "./presentation/ProfileForm";

const getSchema = () => Yup.object().shape({
    bio: Yup
        .string()
        .min(24, "Please write a little more, so we can get to know you.")
        .required("This field is required.")
});


const ProfileSetup = props => {
    const [user, setUser, token, setToken] = useContext(UserContext);
    const [profile, setProfile] = useState(user.profile);

    useEffect (
        () => {
            if(profile && profile.bio.length) {
                history.push(`/profile`);
            }
        }, [profile]
    )

    const handleSubmit = formData => {
        const endpoint = AuthUrls.USER_PROFILE;
        const token = localStorage.token;
        const body = {
            "profile": {
                "bio": formData.bio
            }
        };

        axios.patch(endpoint, body, {
            headers: {
                authorization: `Token ${token}`
            }
        })
        .then(response => {
            const res = response.data;
            localStorage.setItem("user", JSON.stringify(res))
            setUser(res);
            setProfile(res.profile);
        })
        .catch(err => {
            console.log("ERROR", err)
        })
    }

    return (
        <section className="uk-height-1-1">
            <div className="uk-height-1-1 uk-container uk-container-small uk-flex uk-flex-center uk-flex-middle uk-position-z-index uk-position-relative">
                <div className="uk-width-1-2@s uk-padding-small" data-uk-scrollspy="cls: uk-animation-fade">
                    <Formik
                        initialValues={{
                            bio: "",
                        }}
                        validationSchema={getSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
                            setTimeout(() => {
                                setSubmitting(false);
                            }, 1000);
                        }}
                        render={formikProps =>
                            <ProfileForm
                                profile={profile}
                                {...formikProps}
                                {...props} />
                        }
                    />
                </div>
            </div>
        </section>
    )
}

export default ProfileSetup;
