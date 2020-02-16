import React, { useState, useEffect, useRef, useContext, useReducer } from "react";
import axios from "axios";
import { UserContext } from "../Contexts/UserContext";
import { OptionsUrls } from "../../constants/Urls";

import "./Autocomplete.css";

const Autocomplete = ({inputRef, setLanguages, ...props}) => {

    const fieldRef = useRef();
    const [token, setToken] = useContext(UserContext);
    const [countries, setCountries] = useState([])
    const [state, setState] = useState({
        activeItem: 0,
        filteredItems: [],
        displayItems: false,
        inputValue: ''
    })

    useEffect(
        () => {
            const endpoint = `${OptionsUrls.COUNTRIES}`;
            axios.get(endpoint, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then((response) => {
                setCountries(response.data.map(item => item.country_name.trim()))
            })
            .catch((error) => {
                console.log("BIG ERROR", error);
            });

            return () => console.log("CLEANUP")
        }, []
    )

    const handleChange = (e) => {
        const inputValue = e.currentTarget.value;
        const filteredItems = countries.filter(
            (optionName) => optionName.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
        );

        setState({
            activeItem: 0,
            filteredItems,
            displayItems: true,
            inputValue: e.currentTarget.value
        });
    };

    const handleClick = (e) => {
        setState({
            activeItem: 0,
            filteredItems: [],
            displayItems: false,
            inputValue: e.currentTarget.innerText
        });
        fieldRef.current.value = "";
        handleAddItems(e.currentTarget.innerText)
    };

    const handleKeyDown = (e) => {
        const { activeItem, filteredItems } = state;

        if (e.keyCode === 13) {
            const inList = filteredItems && countries.includes(filteredItems[activeItem]);
            if(!inList || !fieldRef.current.value) return;
            setState({
                activeItem: 0,
                filteredItems: [],
                displayItems: false,
                inputValue: filteredItems[activeItem]
            });
            fieldRef.current.value = "";
            handleAddItems(filteredItems[activeItem]);
            e.preventDefault();
        }
        else if (e.keyCode === 38) {
            e.preventDefault();
            if (activeItem === 0) {
                return;
            }
            setState({
                activeItem: activeItem - 1,
                filteredItems,
                displayItems: true,
                inputValue: e.currentTarget.value
            });
        }
        else if (e.keyCode === 40) {
            e.preventDefault();
            if ((filteredItems && activeItem === filteredItems.length - 1) || activeItem >= 9) {
                return;
            }
            setState({
                activeItem: activeItem + 1,
                filteredItems,
                displayItems: true,
                inputValue: e.currentTarget.value
            });
        }
    };

    const [itemsArray, setItemsArray] = useState([]);

    const [selected, dispatchSelected] = useReducer((state, action) => {
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

    function handleAddItems(e) {
        dispatchSelected({
            type: "add",
            name: e
        });
    }

    useEffect(
        () => {
            setItemsArray(selected.map(item => item.name.trim()))
            setLanguages(selected.map(item => item.name.trim()))
        }, [selected]
    )

    return (
        <>
        <input
            ref={fieldRef}
            name="countries"
            label="Countries"
            placeholder="Enter country name and press return"
            className={`uk-input uk-form-large uk-width-expand`}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={(fieldRef.current && fieldRef.current.value) || ""}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            />
            {
                state.displayItems && state.inputValue.length && state.filteredItems ?
                <div className="list-panel uk-panel uk-padding-remove uk-box-shadow-medium">
                    <ul className="uk-list">
                    {
                        state.filteredItems.map((optionName, index) => {
                            return (
                                <li
                                    className={`${state.activeItem === index ? "active-item" : "default-item"}`}
                                    key={`item_${index}`}
                                    onClick={handleClick}>
                                    {optionName}
                                </li>
                            )
                        }).slice(0, 8)
                    }
                    </ul>
                </div>
                : null
            }
            <div className="uk-margin-top" data-uk-margin>
            {itemsArray.map((item, index) => (
              <div key={`country_${index}`} className="icon-tags uk-label uk-border-pill uk-width-auto uk-margin-small-right">
                <span data-uk-icon="icon: close" onClick={() => dispatchSelected({ type: "remove", index })} />
                <p>{item}</p>
              </div>
            ))}
            </div>
        </>
    )
}

export default Autocomplete;
