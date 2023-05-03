import React, { useState } from 'react';
import style from "./ImageBox.module.less"


const ImageBox = (props) => {
    return <div className={style.imageBox} onClick={() => props.deleteImage(props.index)}>
        <img className={style.image} src={props.image} />
    </div>
}

export default ImageBox