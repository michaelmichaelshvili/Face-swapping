import React, { useContext, useState } from 'react';
import style from "./ChooseFace.module.less"
// import ImageList from '@mui/material/ImageList';
// import ImageListItem from '@mui/material/ImageListItem';
const ChooseFace = (props) => {

    const [image, setImage] = useState(null)

    return <div className={style.exchangeLine}>
        {image ?
            null :
            <div className={style.chooseBox} />}
    </div>
}

export default ChooseFace