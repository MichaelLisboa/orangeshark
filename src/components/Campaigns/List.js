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
            console.log('Fetch more list items!', next);
            setIsFetching(true);
        }
    }

    function fetchMoreListItems() {
        getNextCampaigns(localStorage.token, next)
            .then(response => {
                console.log("NEXT SET", response.next)
                setNext(response.next);
                setListItems(prevState => ([...prevState, ...response.results]));
            })
            .catch(err => {
                localStorage.removeItem("token");
            })
            setTimeout(() => {
                setIsFetching(false);
                console.log("NEXT?", next)
            }, 2000)
    }

    useEffect(
        () => {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, [handleScroll]
    );

    useEffect(
        () => {
            if (!isFetching) return;
            fetchMoreListItems();
        }, [isFetching]
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
