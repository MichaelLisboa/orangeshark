import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import DeleteProject from "../DeleteProject";
import moment from "moment";

const ProjectHeaderMember = ({user, project, projectStatus, setProjectStatus}) => {
    const introMessage = () => {
        switch (projectStatus) {
            case 'accepted':
                return "this is your current Gig."
            case 'closed':
                return "this Gig is completed."
            case 'canceled':
                return "this Gig is canceled."
            default:
                return `${project.member.profile.first_name} is requesting your services.`
        }
    }
    return (
        <>
        <p className="uk-h1 uk-text-center uk-heading-line uk-padding-small"><span>The Gig</span></p>
        <div>
            <p className="uk-text-muted uk-text-small uk-margin-remove-vertical">Deadline: <span className="uk-h6">{moment(project.end_date).format('ll')}</span> ({moment(project.end_date).fromNow()})</p>
        </div>
        </>
    )
}

export default ProjectHeaderMember;
