import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import style from "./MainImage.module.less"
import ImagesContext from '../../utils/ImagesContext';

const MainImage = () => {
    const { mainImage, setMainImage } = useContext(ImagesContext)
    const inputFileRef = useRef()
    const onSelect = (e) => {
        // if (e.target.files?.[0]) {
        //     setMainImage(URL.createObjectURL(e.target.files[0]))
        // }
        let file = e.target.files?.[0];
        setMainImage(file)
        // let reader = new FileReader();

        // reader.readAsArrayBuffer(file);

        // reader.onload = function () {

        //     setMainImage(reader.result)
        // };

        // reader.onerror = function () {
        //     console.log(reader.error);
        // };
    }

    const deleteImage = useCallback((e) => {
        setMainImage(null)
    }, [])

    useEffect(() => {
        document.addEventListener("deleteMainImage", deleteImage)

        return () => {
            document.removeEventListener("deleteMainImage", deleteImage)
        }
    }, [deleteImage])

    return <div className={style.mainImage}>
        {!mainImage ?
            <>
                <img className={style.uploadImage} src={require("../../assets/upload.png").default} alt="upload" onClick={() => inputFileRef.current.click()} />
                <label htmlFor="mainImage" className={style.inputLabel}>בחר תמונה</label>
                <input id='mainImage' className={style.fileInput} type='file' name='mainImage' accept='image/*' onChange={onSelect} ref={inputFileRef} />
            </> :
            <img className={style.image} src={URL.createObjectURL(mainImage)} />}
    </div>
}

export default MainImage