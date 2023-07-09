import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import style from "./MainImage.module.less"
import ImagesContext from '../../utils/ImagesContext';
import { Mutex } from 'async-mutex';
import ImageBox from '../ImageBox/ImageBox.jsx';
import mergeImages from 'merge-images';
import ExchangeImagesContext from '../../utils/ExchangeImagesContext';
import { urltoFile } from '../../utils/imageUtils';


const MainImageContainer = () => {
    const { mainImage, setMainImage, bboxes, setFaceImages, setBboxes, showEdit } = useContext(ImagesContext)
    const { exchangeImages, setExchangeImages } = useContext(ExchangeImagesContext)

    const inputFileRef = useRef(null);
    const cropImageRef = useRef([])
    const isMergePerformedRef = useRef(false)

    const mutex = new Mutex();

    const onSelect = (e) => {
        if (e.target.files?.length)
            setMainImage(e.target.files[0])
    }


    const deleteImage = useCallback((e) => {
        setMainImage(null)
        setFaceImages([])
        setBboxes({ ...bboxes, mainImage: [] })
        setExchangeImages({})
    }, [])

    const detectFaces = useCallback((e) => {
        cropImageRef.current = []
    }, [])

    const afterImageCrop = (value, index) => {
        cropImageRef.current.push({ key: index, value })
        setFaceImages(cropImageRef.current)
    }

    useEffect(() => {
        const merge = async () => {
            const b64 = await mergeImages([
                { src: URL.createObjectURL(mainImage) },
                ...Object.entries(exchangeImages).map(([key, img]) => {
                    return { src: img, x: bboxes['mainImage'][key][0], y: bboxes['mainImage'][key][1] }
                })
            ])
            const b64AsFile = await urltoFile(b64, "merged imaged")
            setMainImage(b64AsFile)
        }
        if (showEdit) {
            if (!isMergePerformedRef.current) {
                merge()
                isMergePerformedRef.current = true
            }
        } else {
            isMergePerformedRef.current = false
        }
    }, [showEdit, mainImage, exchangeImages, bboxes])

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