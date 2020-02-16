import React, { useReducer, useEffect } from "react";

const Keywords = ({inputRef, setKeywords, ...props}) => {
    const [keywords, dispatchKeywords] = useReducer((state, action) => {
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

    function handleAddKeywords(e) {
        if (!e.target.value) return;
        e.preventDefault();
        dispatchKeywords({
            type: "add",
            name: inputRef.current.value
        });
        inputRef.current.value = "";
    }

    useEffect(
        () => {
            setKeywords(keywords.map(item => item.name.trim()));
        }, [keywords]
    )

    return (
    <>
        <div className="uk-margin">
            <div className="uk-h4">
                Keywords
            </div>
            <p className="uk-text-small uk-text-muted uk-margin-small-bottom">
            </p>
            <div className="uk-grid-collapse" data-uk-grid>
                <input
                    ref={inputRef}
                    defaultValue={keywords.map(item => item.name.trim()) || ""}
                    name="keywords"
                    label="Keywords"
                    placeholder="Enter keyword and press return"
                    className={`uk-input uk-form-large uk-width-expand`}
                    onKeyDown={(e) => {
                            if(e.keyCode === 13) {
                                handleAddKeywords(e)
                            }
                        }}
                    />
            </div>
            <div className="uk-margin-top" data-uk-margin>
            {keywords.map((item, index) => (
              <div key={item.id} className="icon-tags uk-label uk-border-pill uk-width-auto uk-margin-small-right">
                <span data-uk-icon="icon: close" onClick={() => dispatchKeywords({ type: "remove", index })} />
                <p>{item.name.trim()}</p>
              </div>
            ))}
            </div>
        </div>
    </>
    )
}

export default Keywords;
