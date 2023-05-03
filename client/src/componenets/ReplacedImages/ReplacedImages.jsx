import React, { useState } from 'react';
import style from "./ReplacedImages.module.less"
import ImageBox from './ImageBox/ImageBox.jsx';

const ReplacedImages = () => {
    const [images, setImages] = useState([])
    const onSelect = (e) => {
        if (e.target.files?.[0]) {
            setImages([...images, URL.createObjectURL(e.target.files[0])])
        }
    }
    const deleteImage = (index) => {
        const temp = [...images]
        temp.splice(index, 1)
        setImages(temp)
    }
    const imageBoxes = images.map((img, index) => <ImageBox key={index} image={img} index={index} deleteImage={deleteImage} />)

    return <div className={style.replacedImages}>
        {imageBoxes}
        <label htmlFor="repImage">+</label>
        <input id='repImage' className={style.fileInput} type='file' name='mainImage' accept='image/*' onChange={onSelect} />
    </div>
}

export default ReplacedImages