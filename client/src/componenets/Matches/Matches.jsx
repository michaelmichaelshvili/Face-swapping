import React, { useContext } from 'react';
import style from "./Matches.module.less"
import ImagesContext from '../../utils/ImagesContext';
import FaceExchangeLine from './FaceExchangeLine/FaceExchangeLine.jsx';

const Matches = () => {
    const { faceImages } = useContext(ImagesContext)

    const faceExchangeLines = faceImages?.map(({ key, value }, index) => <FaceExchangeLine key={index} image={value} index={key} />)

    return <div className={style.matches}>
        {faceExchangeLines}
    </div>
}

export default Matches