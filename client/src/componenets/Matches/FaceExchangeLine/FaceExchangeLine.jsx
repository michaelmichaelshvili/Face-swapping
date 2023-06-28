import React, { useContext, useState } from 'react';
import style from "./FaceExchangeLine.module.less"
import ChooseFace from '../ChooseFace/ChooseFace.jsx';

const FaceExchangeLine = (props) => {

    const [image, setImage] = useState(null)

    const setChosenImage = () => {

    }

    return <div className={style.exchangeLine}>
        <img src={props.image} className={style.faceImage} />
        <img src={require('../../../assets/exchange.svg').default} className={style.exchangeImage} />
        {/* {image ?
            <img src={image} />
            : <ChooseFace setChosenImage={setChosenImage} />} */}
        <ChooseFace setChosenImage={setChosenImage} />
    </div>
}

export default FaceExchangeLine