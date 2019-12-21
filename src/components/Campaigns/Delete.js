import React, { useState, useEffect } from "react"
import axios from "axios";
import history from "../../utils/historyUtils";
import UIkit from "uikit";
import { useToasts } from "react-toast-notifications";
import { CampaignUrls } from "../../constants/Urls";


const Delete = ({campaign}) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const { addToast } = useToasts();

    async function deleteCampaign(id) {
        const endpoint = `${CampaignUrls.DEFAULT}${id}`;
        const result = await axios.delete(endpoint, {
            headers: {
                authorization: `Token ${localStorage.token}`
            }
        })
        const data = await result.data
        return data;
    }

    const fn = (id) => {
        deleteCampaign(id)
        .then(response => {
            const res = response.data;
            const msg = "Campaign successfully removed.";
            addToast(msg, {
                appearance: "success",
                autoDismiss: "true"
            })
            history.push("/campaigns");
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        if (isConfirmed) {
            fn(campaign.id);
        }
    }, [isDeleted, setIsDeleted]);

    useEffect(() => {
        if (!isConfirmed) return;
        const msg = `Are you sure?`;
        UIkit.modal.confirm(msg, {
            keyboard: false,
            bgclose: false,
            labels: {
                cancel: "Cancel",
                ok: "Delete"
            }
        })
        .then(function() {
            setIsConfirmed(true);
            setIsDeleted(true);
            console.log("Deleted.", isConfirmed)
        }, function () {
            setIsConfirmed(false);
            setIsDeleted(false);
            console.log("Canceled.", isConfirmed)
        });
    }, [isConfirmed])

    return (
        <button
            className="uk-icon-link"
            data-uk-icon="icon: close; ratio: 1"
            onClick={() => setIsConfirmed(!isConfirmed)}
        />
    )
}

export default Delete;
