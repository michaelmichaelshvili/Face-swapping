import React from "react";
import style from "./Control.module.less"

const Control = (props) => {
    return <div className={style.control} style={props.style} onClick={props.onClick}>
        {props.text}
    </div>
}

export default Control