import React, { useContext, useRef, useState } from 'react';
import style from "./ChooseFace.module.less"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { ClickAwayListener } from '@mui/material';
import ImagesContext from '../../../utils/ImagesContext';
const ChooseFace = (props) => {

    const { replacingImages } = useContext(ImagesContext)
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const ref = useRef(null)

    const onChooseImage = (e, index) => {
        setImage(replacingImages[index])
        setOpen(false)
    }

    return <div className={style.a} >
        <div className={style.chosenImage} onClick={() => setOpen(!open)} ref={ref} style={{ backgroundImage: image ? 'url(' + image + ')' : null }} />
        <Menu
            id="lock-menu"
            anchorEl={ref.current}
            open={open}
            onClose={() => setOpen(false)}
            MenuListProps={{
                'aria-labelledby': 'lock-button',
                role: 'listbox',
            }}
        >
            {replacingImages.map((option, index) => (
                <MenuItem
                    key={index}
                    onClick={(e) => { onChooseImage(e, index) }}
                >
                    {<img src={option} className={style.imageItem}/>}
                </MenuItem>
            ))}
        </Menu>
    </div>
}

export default ChooseFace