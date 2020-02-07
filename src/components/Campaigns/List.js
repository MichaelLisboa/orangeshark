import React, { useState, useEffect } from "react";
import axios from "axios";
import CampaignListItem from "./presentation/CampaignListItem";

async function getNextCampaigns(token, next) {
    const result = await axios.get(next, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    const res = await result.data;
    return res;
}

const List = ({next, setNext, isLoading, campaigns}) => {
    const [listItems, setListItems] = useState(campaigns);
    const [isFetching, setIsFetching] = useState(false);

    function handleScroll() {
        if (
            (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
            listItems.length &&
            !isFetching &&
            next !== null
        ) {
            setIsFetching(true);
        }
    }

    useEffect(
        () => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []
    );

    useEffect(
        () => {
            if (!isFetching) return;
            getNextCampaigns(localStorage.token, next)
                .then(response => {
                    setNext(response.next);
                    setListItems(prevState => ([...prevState, ...response.results]));
                })
                .catch(err => {
                    localStorage.removeItem("token");
                })
                setTimeout(() => {
                    setIsFetching(false);
                }, 2000)
        }, [isFetching, next, setNext]
    );

    if (isLoading) {
        return (
            <div />
        )
    }

    return (
        listItems.map((item, index) => {
            return (
                <CampaignListItem
                    key={index}
                    campaign={item}
                />
            )
        })
    )
}

export default List;
