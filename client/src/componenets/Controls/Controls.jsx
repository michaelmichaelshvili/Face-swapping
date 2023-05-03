import React from 'react';
import Control from './Control/Control.jsx';
import style from './Controls.module.less'
import classnames from "classnames"

const Controls = () => {
    return <div className={style.controls}>
        <div>
            <Control text="ערוך זיהוים" style={style.edit} />
        </div>
        <div>
            <Control text="זהה פנים" style={style.detect} onClick={() => { }} />
            <Control text="מחק תמונה ראשית" style={style.delete} onClick={() => { }} />
            <Control text="הורדה" style={style.download} onClick={() => { }} />
            <Control text="הצג תמונה מקורית/ערוכה" style={style.switch} onClick={() => { }} />
        </div>

    </div>
}

export default Controls