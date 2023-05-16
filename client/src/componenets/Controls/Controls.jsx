import React, { useContext } from 'react';
import Control from './Control/Control.jsx';
import style from './Controls.module.less'
import classnames from "classnames"
import ImagesContext from '../../utils/ImagesContext.js';
import { detectFaces } from '../../utils/ServerExecuter.js';

const Controls = () => {

    // const detectFaces = () => {

    // }
    const { mainImage, replaceImages } = useContext(ImagesContext)


    return <div className={style.controls}>
        <div>
            <Control text="ערוך זיהוים" style={style.edit} />
        </div>
        <div>
            <Control text="זהה פנים" style={style.detect} onClick={() => detectFaces(mainImage, replaceImages)} />
            <Control text="מחק תמונה ראשית" style={style.delete} onClick={() => { document.dispatchEvent(new CustomEvent("deleteMainImage")) }} />
            <Control text="הורדה" style={style.download} onClick={() => { }} />
            <Control text="הצג תמונה מקורית/ערוכה" style={style.switch} onClick={() => { }} />
        </div>

    </div>
}

export default Controls