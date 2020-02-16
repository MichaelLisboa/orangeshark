import React from "react";

const AgeGroups = ({inputRef, formValues, handleInputChange, setAgeGroups, ...props}) => {

    return (
    <>
        <div className="uk-h4">
            Age groups
        </div>
        <div className="uk-margin">
            <input
                value={formValues.age_groups}
                onChange={(e) => handleInputChange(e)}
                name="age_groups"
                label="Age groups"
                placeholder="Age groups"
                className={`uk-input uk-form-large`}
                required
            />
        </div>
    </>
    )
}

export default AgeGroups;
