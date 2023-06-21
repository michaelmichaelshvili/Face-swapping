import React, { useContext } from 'react';
import style from "./FaceExchange.module.less"
import ChooseFace from '../ChooseFace/ChooseFace.jsx';

const FaceExchange = (props) => {

    return <div className={style.exchangeLine}>
        <img src={props.image} className={style.faceImage} />
        <img src={require('../../../assets/dots.png').default} className={style.dots} />
        <ChooseFace />
    </div>
}

export default FaceExchange