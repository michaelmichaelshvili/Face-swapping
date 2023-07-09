import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import style from "./ImageBox.module.less"
import rough from "roughjs/bundled/rough.esm";
import trash from '../../assets/trash.svg'
const generator = rough.generator();

const ImageBox = (props) => {
    const dimRatio = useRef({ h: 1, w: 1 })
    const imageRef = useRef(null)
    const bboxCanvasRef = useRef(null)
    const cropCanvasRef = useRef(null)

    const onload = (e) => {
        let image = imageRef.current;
        let hRatio = image.naturalHeight / image.height;
        let wRatio = image.naturalWidth / image.width;
        dimRatio.current = { h: hRatio, w: wRatio }
    }

    useLayoutEffect(() => {
        if (bboxCanvasRef.current) {
            const bboxCanvas = bboxCanvasRef.current;
            const cropCanvas = cropCanvasRef.current;

            const context = bboxCanvas.getContext("2d");
            const context1 = cropCanvas.getContext("2d");

            bboxCanvas.style.width = "100%";
            bboxCanvas.style.height = "100%";

            bboxCanvas.width = bboxCanvas.offsetWidth;
            bboxCanvas.height = bboxCanvas.offsetHeight;

            context.clearRect(0, 0, bboxCanvas.width, bboxCanvas.height);

            const roughCanvas = rough.canvas(bboxCanvas);

            props.bboxes?.forEach((rect, index) => {
                const [x, y, w, h] = rect
                const [x1, y1, w1, h1] = [
                    (x / dimRatio.current.w) + imageRef.current.getBoundingClientRect().x - bboxCanvasRef.current.getBoundingClientRect().x,
                    (y / dimRatio.current.h) + imageRef.current.getBoundingClientRect().y - bboxCanvasRef.current.getBoundingClientRect().y,
                    w / dimRatio.current.w, h / dimRatio.current.h]

                const r = generator.rectangle(x1, y1, w1, h1)

                roughCanvas.draw(r)
                const image = new Image();
                image.src = URL.createObjectURL(props.image)
                image.onload = () => {
                    props.mutex.runExclusive(() => {
                        cropCanvas.style.width = w;
                        cropCanvas.style.height = h;
                        cropCanvas.width = w;
                        cropCanvas.height = h;
                        context1.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
                        context1.drawImage(image, x, y, w, h, 0, 0, w, h);
                        props.afterImageCrop?.(cropCanvas.toDataURL(), index)
                    })
                };
            })
        }

    }, [props.bboxes, props.image])

    return <div className={style.imageBox}>
        <canvas
            ref={bboxCanvasRef}
            style={{
                position: 'absolute',
            }}
        // width={window.innerWidth}
        // height={window.innerHeight}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        ></canvas>
        <img ref={imageRef} className={style.image} src={URL.createObjectURL(props.image)} onLoad={onload} />
        <div className={style.deleteImageContainer}>
            <img className={style.deleteImage} src={trash} onClick={props.onDeleteClick} />
        </div>
        <canvas ref={cropCanvasRef} style={{ visibility: 'hidden', position: 'absolute' }} />
    </div>
}

export default ImageBox