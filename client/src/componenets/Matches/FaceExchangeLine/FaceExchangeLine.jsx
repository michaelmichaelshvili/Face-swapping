import React, { useContext, useRef, useState } from 'react';
import style from "./FaceExchangeLine.module.less"
import ChooseFace from '../ChooseFace/ChooseFace.jsx';
import ExchangeImagesContext from '../../../utils/ExchangeImagesContext';
import ImagesContext from '../../../utils/ImagesContext';
import { urltoFile } from '../../../utils/imageUtils';

const FaceExchangeLine = (props) => {

    const { bboxes } = useContext(ImagesContext)
    const { exchangeImages, setExchangeImages } = useContext(ExchangeImagesContext)

    const [image, setImage] = useState(null)

    const cropCanvasRef = useRef(null)

    const setChosenImage = async (image) => {
        const cropCanvas = cropCanvasRef.current;
        const context = cropCanvas.getContext("2d");
        const [x, y, w, h] = bboxes['mainImage'][props.index]
        cropCanvas.style.width = w;
        cropCanvas.style.height = h;
        cropCanvas.width = w;
        cropCanvas.height = h;
        context.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
        const imageFile = await urltoFile(image, "merged imaged")
        const newImage = new Image();
        newImage.src = URL.createObjectURL(imageFile)
        newImage.onload = () => {
            context.drawImage(newImage, 0, 0, newImage.width, newImage.height, 0, 0, w, h);
            setExchangeImages({ ...exchangeImages, [props.index]: cropCanvas.toDataURL() })
        };
    }

    return <div className={style.exchangeLine}>
        <img src={props.image} className={style.faceImage} />
        <img src={require('../../../assets/exchange.svg').default} className={style.exchangeImage} />
        <ChooseFace setChosenImage={setChosenImage} />
        <canvas ref={cropCanvasRef} style={{ visibility: 'hidden', position: 'absolute' }} />
    </div>
}

export default FaceExchangeLine;