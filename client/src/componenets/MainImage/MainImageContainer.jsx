import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import style from "./MainImage.module.less"
import ImagesContext from '../../utils/ImagesContext';
import rough from "roughjs/bundled/rough.esm";
import { Mutex } from 'async-mutex';
import ImageBox from '../ImageBox/ImageBox.jsx';

const generator = rough.generator();
const MainImageContainer = () => {
    const { mainImage, setMainImage, bboxes, setFaceImages, setBboxes } = useContext(ImagesContext)
    const inputFileRef = useRef(null);
    const mutex = new Mutex();

    const onSelect = (e) => {
        if (e.target.files?.length)
            setMainImage(e.target.files[0])
    }
    const cropImageRef = useRef([])
    const deleteImage = useCallback((e) => {
        setMainImage(null)
        setFaceImages([])
        setBboxes({ ...bboxes, mainImage: [] })
    }, [])
    const detectFaces = useCallback((e) => {
        cropImageRef.current = []
    }, [])
    const afterImageCrop = (value) => {
        cropImageRef.current.push(value)
        setFaceImages(cropImageRef.current)
    }
    useEffect(() => {
        document.addEventListener("detectFaces", detectFaces)


        return () => {
            document.removeEventListener("detectFaces", detectFaces)
        }
    }, [deleteImage])

    return <div className={style.mainImage}>
        {!mainImage ?
            <div className={style.withoutImg}>
                <img className={style.uploadImage} src={require("../../assets/upload.png").default} alt="upload" onClick={() => inputFileRef.current.click()} />
                <label htmlFor="mainImageInput" className={style.inputLabel}>בחר תמונה</label>
                <input id='mainImageInput' className={style.fileInput} type='file' name='mainImageInput' accept='image/*' onChange={onSelect} ref={inputFileRef} />
            </div> :
            <ImageBox image={mainImage} bboxes={bboxes.mainImage} deleteImage={() => { }} mutex={mutex}
                afterImageCrop={afterImageCrop} onDeleteClick={deleteImage} />
        }

    </div>
}

export default MainImageContainer