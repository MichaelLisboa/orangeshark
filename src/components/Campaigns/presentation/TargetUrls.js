import React, { useReducer, useEffect } from "react";

const TargetUrls = ({inputRef, setTargetUrls, ...props}) => {

    const [targetUrls, dispatchTargetUrls] = useReducer((state, action) => {
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

    function handleAddTargetUrl(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchTargetUrls({
            type: "add",
            name: inputRef.current.value
        });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setTargetUrls(targetUrls.map(item => item.name.trim()));
        }, [setTargetUrls, targetUrls]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Target URLs
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={targetUrls.map(item => item.name.trim()) || ""}
                    name="ad_text"
                    label="Ad Text"
                    placeholder="Enter target URL and press return"
                    className={`uk-input uk-form-large`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddTargetUrl(e)
                            }
                        }}
                    />
            </div>
            <ul className="uk-list uk-list-divider uk-margin-top">
            {targetUrls.map((item, index) => (
              <li key={item.id}>
                <button
                    type="button"
                    className="uk-width-auto uk-margin-small-right"
                    onClick={() => dispatchTargetUrls({ type: "remove", index })}
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

export default TargetUrls;
