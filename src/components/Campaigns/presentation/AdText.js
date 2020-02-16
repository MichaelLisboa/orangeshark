import React, { useState, useReducer, useEffect, useRef, useContext } from "react";

const AdText = ({inputRef, setAdText, ...props}) => {
    const [adTexts, dispatchAdTexts] = useReducer((state, action) => {
        switch (action.type) {
            case "add":
                return [...state, { id: state.length, name: action.name }];
            case "remove":
                return state.filter((_, index) => index !== action.index);
            case "empty":
                return []
            default:
                return state;
        }
    }, []);

    function handleAddAdText(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchAdTexts({
            type: "add",
            name: inputRef.current.value
        });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setAdText(adTexts.map(item => item.name.trim()))
        }, [adTexts]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Ad Text
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={adTexts.map(item => item.name.trim()) || ""}
                    name="ad_text"
                    label="Ad Text"
                    placeholder="Enter ad text and press return"
                    className={`uk-input uk-form-large uk-width-expand`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddAdText(e)
                            }
                        }}
                    />
            </div>
            <ul className="uk-list uk-list-divider uk-margin-top">
            {adTexts.map((item, index) => (
              <li key={item.id}>
                <button
                    type="button"
                    className="uk-width-auto uk-margin-small-right"
                    onClick={() => dispatchAdTexts({ type: "remove", index })}
                    data-uk-icon="close"
                    />
                    <span className="uk-h4">"{item.name.trim()}"</span>
              </li>
            ))}
            </ul>
        </div>
    </>
    )
}

export default AdText;
