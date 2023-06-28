import React, { useContext } from 'react';
import style from "./Matches.module.less"
import ImagesContext from '../../utils/ImagesContext';
import FaceExchangeLine from './FaceExchangeLine/FaceExchangeLine.jsx';

const Matches = () => {
    const { replaceImages, setReplaceImages, bboxes, mainImage, faceImages } = useContext(ImagesContext)

    const faceBoxes = faceImages?.map((img, index) => <FaceExchangeLine key={index} image={img} />)

    return <div className={style.matches}>
        {faceBoxes}
        {/* <div className={style.test}/> */}
    </div>
}

export default Matches