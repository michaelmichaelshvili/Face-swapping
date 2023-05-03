import React, { useState } from 'react';
import style from "./MainImage.module.less"

const MainImage = () => {
    const [image, setImage] = useState(null)
    const onSelect = (e) => {
        if (e.target.files?.[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return <div className={style.mainImage}>
        {!image ?
            <>
                <label htmlFor="mainImage">בחר תמונה</label>
                <input id='mainImage' className={style.fileInput} type='file' name='mainImage' accept='image/*' onChange={onSelect} />
            </> :
            <img className={style.image} src={image} />}
    </div>
}

export default MainImage