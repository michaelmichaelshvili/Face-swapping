import React, { useCallback, useContext, useMemo, useRef } from 'react';
import style from "./ReplacedImages.module.less"
import ImageBox from './ImageBox/ImageBox.jsx';
import ImagesContext from '../../utils/ImagesContext';

const ReplacedImages = () => {
    const { replaceImages, setReplaceImages, rectangles } = useContext(ImagesContext)

    const inputFileRef = useRef(null);

    const onSelect = (e) => {
        if (e.target.files?.[0]) {
            setReplaceImages([...replaceImages, e.target.files[0]])
        }
    }
    const deleteImage = (index) => {
        const temp = [...replaceImages]
        temp.splice(index, 1)
        setReplaceImages(temp)
    }
    const imageBoxes = useMemo(() =>
        replaceImages.map((img, index) => <ImageBox key={index} image={img} index={index} rects={rectangles[`replaceImage-${index}`]} deleteImage={deleteImage} />)
        , [replaceImages, rectangles])

    return <div className={style.replacedImages}>
        {imageBoxes}
        <div className={style.addImageArea}>

            <label className={style.label} htmlFor="repImage"><img className={style.addImage} src={require("../../assets/plus.png").default} alt="upload" />הוסף תמונה</label>
            <input ref={inputFileRef} id='repImage' className={style.fileInput} type='file' name='mainImage' accept='image/*' onChange={onSelect} />
        </div>
    </div>
}

export default ReplacedImages