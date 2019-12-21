import React from "react";

export const Input = props =>
    <input className={`uk-input uk-form-${props.format} uk-form-${props.size}`} type={props.type} placeholder={props.placeholder} />
