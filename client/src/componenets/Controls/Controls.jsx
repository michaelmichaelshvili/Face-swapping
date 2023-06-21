import React, { useCallback, useContext, useState } from 'react';
import Control from './Control/Control.jsx';
import style from './Controls.module.less'
import classnames from "classnames"
import ImagesContext from '../../utils/ImagesContext.js';
import { detectFacesInServer } from '../../utils/ServerExecuter.js';
import { b64toBlob } from '../../utils/canvasUtils.js';

const Controls = () => {
    const { mainImage, replaceImages, setBboxes } = useContext(ImagesContext)
    const [x, setX] = useState(null)
    const detectFaces = useCallback(async () => {
        const rects = await detectFacesInServer(mainImage, replaceImages)
        setBboxes(rects)
        document.dispatchEvent(new CustomEvent("detectFaces"))
    }, [mainImage, replaceImages])

    const deleteMainImage = () => {
        setBboxes([])
        document.dispatchEvent(new CustomEvent("deleteMainImage"))
    }


    return <div className={style.controls}>
        <div>
            <Control text="ערוך זיהוים" style={style.edit} />
        </div>
        <div>
            <Control text="זהה פנים" style={style.detect} onClick={() => detectFaces(mainImage, replaceImages)} />
            <Control text="מחק תמונה ראשית" style={style.delete} onClick={deleteMainImage} />
            <Control text="הורדה" style={style.download} onClick={() => { }} />
            <Control text="הצג תמונה מקורית/ערוכה" style={style.switch} onClick={() => { }} />
        </div>
    </div>
}

export default Controls