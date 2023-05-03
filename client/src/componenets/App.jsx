import React from 'react';
import style from './App.module.less'
import Controls from './Controls/Controls.jsx';
import MainImage from './MainImage/MainImage.jsx';
import ReplacedImages from './ReplacedImages/ReplacedImages.jsx';
import Matches from './Matches/Matches.jsx';

const App = () => {
    return (
        <div className={style.app}>
            <MainImage />
            <Matches/>
            <ReplacedImages/>
            <Controls />
        </div>
    )
}

export default App