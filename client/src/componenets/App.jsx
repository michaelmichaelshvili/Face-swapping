import React, { useState } from 'react';
import style from './App.module.less'
import Controls from './Controls/Controls.jsx';
import MainImage from './MainImage/MainImage.jsx';
import ReplacedImages from './ReplacedImages/ReplacedImages.jsx';
import Matches from './Matches/Matches.jsx';
import { ThingsProvider } from '../utils/ImagesContext';

const App = () => {
    const [mainImage, setMainImage] = useState(null)
    const [replaceImages, setReplaceImages] = useState([])
    const [bboxes, setBboxes] = useState([])
    const [faceImages, setFaceImages] = useState([])
    return (
        <div className={style.app}>
            <ThingsProvider value={{ mainImage, setMainImage, replaceImages, setReplaceImages, bboxes, setBboxes, faceImages, setFaceImages }}>
                <MainImage />
                <Matches />
                <ReplacedImages />
                <Controls />
            </ThingsProvider>
        </div>
    )
}

export default App