import React, { useState } from 'react';
import style from './App.module.less'
import Controls from './Controls/Controls.jsx';
import MainImageContainer from './MainImage/MainImageContainer.jsx';
import ReplacedImages from './ReplacedImages/ReplacedImages.jsx';
import Matches from './Matches/Matches.jsx';
import { ThingsProvider } from '../utils/ImagesContext';
import { ExchangeImagesProvider } from '../utils/ExchangeImagesContext';

const App = () => {
    const [showEdit, setShowEdit] = useState(false)
    const [mainImage, setMainImage] = useState(null)
    const [replaceImages, setReplaceImages] = useState([])
    const [bboxes, setBboxes] = useState([])
    const [faceImages, setFaceImages] = useState([])
    const [optionalFaces, setOptionalFaces] = useState([])
    const [exchangeImages, setExchangeImages] = useState({})

    return (
        <div className={style.app}>
            <ThingsProvider value={{
                mainImage, setMainImage, replaceImages, setReplaceImages, bboxes, setBboxes,
                faceImages, setFaceImages, optionalFaces, setOptionalFaces, showEdit, setShowEdit
            }}>
                <ExchangeImagesProvider value={{ exchangeImages, setExchangeImages }}>
                    <MainImageContainer />
                    <Matches />
                </ExchangeImagesProvider>
                <ReplacedImages />
                <Controls />
            </ThingsProvider>
        </div>
    )
}

export default App