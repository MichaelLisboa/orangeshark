import React, { useReducer, useEffect } from "react";

const LinkDescr = ({inputRef, setLinkDescr, ...props}) => {

    const [linkDescr, dispatchLinkDescr] = useReducer((state, action) => {
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

    function handleAddLinkDescr(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchLinkDescr({
            type: "add",
            name: inputRef.current.value
        });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setLinkDescr(linkDescr.map(item => item.name.trim()));
        }, [linkDescr]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Link Descriptions
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={linkDescr.map(item => item.name.trim()) || ""}
                    name="ad_text"
                    label="Ad Text"
                    placeholder="Enter link description and press return"
                    className={`uk-input uk-form-large`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddLinkDescr(e)
                            }
                        }}
                    />
            </div>
            <ul className="uk-list uk-list-divider uk-margin-top">
            {linkDescr.map((item, index) => (
              <li key={item.id}>
                <button
                    type="button"
                    className="uk-width-auto uk-margin-small-right"
                    onClick={() => dispatchLinkDescr({ type: "remove", index })}
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

export default LinkDescr;
