import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from "./MainImage.module.less"
import ImagesContext from '../../utils/ImagesContext';
import rough from "roughjs/bundled/rough.esm";

const generator = rough.generator();
function translatedX(canvas, x) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (x - rect.left);
}

function translatedY(canvas, y) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (y - rect.top);
}
const MainImage = () => {
    const { mainImage, setMainImage, rectangles } = useContext(ImagesContext)

    const dimRatio = useRef({ h: 1, w: 1 })
    const inputFileRef = useRef()
    const imageRef = useRef(null)
    const canvasRef = useRef(null)

    const onSelect = (e) => {
        if (e.target.files?.length)
            setMainImage(e.target.files[0])

    }

    const deleteImage = useCallback((e) => {
        setMainImage(null)
    }, [])

    useEffect(() => {
        document.addEventListener("deleteMainImage", deleteImage)

        return () => {
            document.removeEventListener("deleteMainImage", deleteImage)
        }
    }, [deleteImage])

    const onload = (e) => {
        let image = imageRef.current;
        let hRatio = image.naturalHeight / image.height;
        let wRatio = image.naturalWidth / image.width;
        console.log(`Heigth ${hRatio}, Width ${wRatio}`);
        dimRatio.current = { h: hRatio, w: wRatio }
    }

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            context.canvas.width = window.innerWidth;
            context.canvas.height = window.innerHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);
            const roughCanvas = rough.canvas(canvas);
            rectangles.mainImage?.forEach(rect => {
                const [x, y, w, h] = rect
                // const [x1, y1, w1, h1] = [x, y, w, h]
                const [x1, y1, w1, h1] = [translatedX(canvas, x) / dimRatio.current.w, translatedY(canvas, y) / dimRatio.current.h, translatedY(canvas, w) / dimRatio.current.w, translatedX(canvas, h) / dimRatio.current.h]
                // const [x1, y1, w1, h1] = [x / dimRatio.current.h, y / dimRatio.current.w, w / dimRatio.current.w, h / dimRatio.current.h]
                // const [x1, y1, w1, h1] = [translatedX(canvas, x), translatedY(canvas, y), translatedY(canvas, w), translatedX(canvas, h)]
                const r = generator.rectangle(x1, y1 + imageRef.current.getBoundingClientRect().y, w1, h1)
                console.log(x1, y1 + imageRef.current.getBoundingClientRect().y, w1, h1);
                roughCanvas.draw(r)
            })
        }

    }, [canvasRef.current, rectangles])

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        console.log(clientX, clientY);
    }

    return <div className={style.mainImage}>
        {!mainImage ?
            <div className={style.withoutImg}>
                <img className={style.uploadImage} src={require("../../assets/upload.png").default} alt="upload" onClick={() => inputFileRef.current.click()} />
                <label htmlFor="mainImageInput" className={style.inputLabel}>בחר תמונה</label>
                <input id='mainImageInput' className={style.fileInput} type='file' name='mainImageInput' accept='image/*' onChange={onSelect} ref={inputFileRef} />
            </div> :
            <div className={style.withImg}>
                <img ref={imageRef} className={style.image} src={URL.createObjectURL(mainImage)} onLoad={onload} />
                <canvas
                    ref={canvasRef}
                    id="canvas"
                    className={style.canvas}
                    style={{
                        position: 'absolute',
                        // backgroundImage: `url(${URL.createObjectURL(mainImage)})`,
                        // backgroundRepeat: 'no-repeat',
                        // backgroundSize: 'cover'
                    }}
                    // width={window.innerWidth}
                    // height={window.innerHeight}
                    // onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                ></canvas>
            </div>
        }

    </div>
}

export default MainImage