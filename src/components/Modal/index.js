import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import usePortal from "../../lib/usePortal";

import "./Modal.css";

const Modal = ({children, ...props}) => {
    const [isShowing, setIsShowing] = useState(false);
    const target = usePortal("ModalParent");

    useEffect(() => {
        setIsShowing(props.isShown);
        if(isShowing){
            return function cleanup() {
                console.log(isShowing)
            }
        }
    }, [isShowing, props.isShown])

    return (
        <>
        {
        isShowing ? ReactDOM.createPortal(
            <div
                className="modal-full"
                tabIndex={-1} role="dialog">
                <div className="modal-container">
                    {children}
                </div>
            </div>,
            target)
            : null
        }
        </>
    )
}

export default Modal;
