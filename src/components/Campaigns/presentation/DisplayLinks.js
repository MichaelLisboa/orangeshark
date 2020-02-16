import React, { useState, useReducer, useEffect, useRef, useContext } from "react";

const DisplayLinks = ({inputRef, setDisplayLinks, ...props}) => {
    const [displayLinks, dispatchDisplayLinks] = useReducer((state, action) => {
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

    function handleAddDisplayLink(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchDisplayLinks({
            type: "add",
            name: inputRef.current.value
        });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setDisplayLinks(displayLinks.map(item => item.name.trim()));
        }, [displayLinks]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Display Links
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={displayLinks.map(item => item.name.trim()) || ""}
                    name="ad_text"
                    label="Ad Text"
                    placeholder="Enter display link and press return"
                    className={`uk-input uk-form-large`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddDisplayLink(e)
                            }
                        }}
                    />
            </div>
            <ul className="uk-list uk-list-divider uk-margin-top">
            {displayLinks.map((item, index) => (
              <li key={item.id}>
                <button
                    type="button"
                    className="uk-width-auto uk-margin-small-right"
                    onClick={() => dispatchDisplayLinks({ type: "remove", index })}
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

export default DisplayLinks;
