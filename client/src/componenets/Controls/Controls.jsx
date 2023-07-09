import React, { useCallback, useContext, useState } from 'react';
import Control from './Control/Control.jsx';
import style from './Controls.module.less'
import classnames from "classnames"
import ImagesContext from '../../utils/ImagesContext.js';
import { detectFacesInServer } from '../../utils/ServerExecuter.js';

const Controls = () => {
    const { mainImage, replaceImages, setBboxes, setShowEdit } = useContext(ImagesContext)

    const detectFaces = useCallback(async () => {
        const rects = await detectFacesInServer(mainImage, replaceImages)
        setBboxes(rects)
        document.dispatchEvent(new CustomEvent("detectFaces"))
    }, [mainImage, replaceImages])


    return <div className={style.controls}>
        <div>
            <Control text="ערוך זיהוים" style={style.edit} />
        </div>
        <div>
            <Control text="זהה פנים" style={style.detect} onClick={() => detectFaces(mainImage, replaceImages)} />
            <Control text="הצג תמונה מקורית/ערוכה" style={style.switch} onClick={() => { setShowEdit(prev => !prev) }} />
            <Control text="הורדה" style={style.download} onClick={() => { }} />
        </div>
    </div>
}

export default Controls