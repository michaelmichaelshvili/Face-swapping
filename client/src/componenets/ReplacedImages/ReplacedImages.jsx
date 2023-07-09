import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import style from "./ReplacedImages.module.less"
import ImageBox from '../ImageBox/ImageBox.jsx';
import ImagesContext from '../../utils/ImagesContext';
import { Mutex } from 'async-mutex';
const ReplacedImages = () => {
    const { replaceImages, setReplaceImages, bboxes, setBboxes, setOptionalFaces } = useContext(ImagesContext)
    const inputFileRef = useRef(null);
    const mutex = new Mutex();

    const [x, setX] = useState(null)
    const onSelect = (e) => {
        if (e.target.files?.[0]) {
            setReplaceImages([...replaceImages, e.target.files[0]])
        }
    }
    const deleteImage = (index) => {
        const temp = [...replaceImages]
        temp.splice(index, 1)
        setReplaceImages(temp)
        const key = `replaceImage-${index}`
        setBboxes({ ...bboxes, [key]: [] })
    }
    const aRef = useRef([])

    const afterImageCrop = (value) => {
        aRef.current.push(value)
        setOptionalFaces(aRef.current)
    }

    const detectFaces = useCallback((e) => {
        aRef.current = []
    }, [])

    useEffect(() => {
        document.addEventListener("detectFaces", detectFaces)

        return () => {
            document.removeEventListener("detectFaces", detectFaces)
        }
    }, [detectFaces])

    const imageBoxes = useMemo(() =>
        replaceImages.map((img, index) => <ImageBox key={index} image={img} index={index} bboxes={bboxes[`replaceImage-${index}`]}
            mutex={mutex} afterImageCrop={afterImageCrop} onDeleteClick={() => deleteImage(index)} />)
        , [replaceImages, bboxes])
    

    return <div className={style.replacedImages}>
        {imageBoxes}

        <div className={style.addImageArea}>

            <label className={style.label} htmlFor="repImage"><img className={style.addImage} src={require("../../assets/plus.png").default} alt="upload" />הוסף תמונה</label>
            <input ref={inputFileRef} id='repImage' className={style.fileInput} type='file' name='mainImage' accept='image/*' onChange={onSelect} />
        </div>
    </div>
}

export default ReplacedImages