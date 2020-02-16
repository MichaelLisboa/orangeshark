import React, { useState, useEffect } from "react";

const Gender = ({inputRef, setGender, ...props}) => {
    const [checkedItems, setCheckedItems] = useState({});

    const checkboxes = [
        { name: 'male', key: 'checkBox1', label: 'Male' },
        { name: 'female', key: 'checkBox2', label: 'Female'},
        { name: 'other', key: 'checkBox3', label: 'Other' }
    ];

    const handleCheckbox = (event) => {
        setCheckedItems({...checkedItems, [event.target.name] : event.target.checked });
    }

    const genderArray = Object.keys(checkedItems).reduce(
        (o, key) => {
            checkedItems[key] !== false && (o[key] = checkedItems[key]);
            return o;
        }, {});

    useEffect(
        () => {
            setGender(Object.keys(genderArray));
        }, [checkedItems]
    )

    return (
    <>
        <div className="uk-h4">
            Gender
        </div>
        <div>
            {
                checkboxes.map(item => (
                <label key={item.key} className="uk-margin-large-right">
                    <input
                        type="checkbox"
                        className="uk-checkbox"
                        name={item.name}
                        defaultValue=""
                        checked={checkedItems[item.name]}
                        onChange={(e) => {
                            handleCheckbox(e)
                        }}
                    /> <p className="uk-h4 uk-display-inline-block">{item.label}</p>
                </label>
            ))}
        </div>
    </>
    )
}

export default Gender;
