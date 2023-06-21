import React, { useContext } from 'react';
import style from "./Matches.module.less"
import ImagesContext from '../../utils/ImagesContext';
import FaceExchange from './FaceExchange/FaceExchange.jsx';

const Matches = () => {
    const { replaceImages, setReplaceImages, bboxes, mainImage, faceImages } = useContext(ImagesContext)

    const faceBoxes = faceImages?.map((img, index) => <FaceExchange key={index} image={img} />)

    return <div className={style.matches}>
        {faceBoxes}
    </div>
}

export default Matches