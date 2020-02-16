import React, { useState, useReducer, useEffect } from "react";

const Headlines = ({inputRef, setHeadlines, ...props}) => {
    const [headlines, dispatchHeadlines] = useReducer((state, action) => {
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

    function handleAddHeadline(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchHeadlines({ type: "add", name: inputRef.current.value });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setHeadlines(headlines.map(item => item.name.trim()));
        }, [headlines]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Headlines
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={headlines.map(item => item.name.trim()) || ""}
                    name="headlines"
                    label="Headlines"
                    placeholder="Enter a headline and press return"
                    className={`uk-input uk-form-large uk-width-expand`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddHeadline(e)
                            }
                        }}
                    />
            </div>
            <ul className="uk-list uk-list-divider uk-margin-top">
            {headlines.map((item, index) => (
              <li key={item.id}>
                <button
                    type="button"
                    className="uk-width-auto uk-margin-small-right"
                    onClick={() => dispatchHeadlines({ type: "remove", index })}
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

export default Headlines;
