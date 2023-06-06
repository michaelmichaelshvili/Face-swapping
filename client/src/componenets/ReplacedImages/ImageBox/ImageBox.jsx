import React, { useLayoutEffect, useRef, useState } from 'react';
import style from "./ImageBox.module.less"
import rough from "roughjs/bundled/rough.esm";
import { translatedX, translatedY } from '../../../utils/canvasUtils';

const generator = rough.generator();

const ImageBox = (props) => {
    const dimRatio = useRef({ h: 1, w: 1 })
    const imageRef = useRef(null)
    const canvasRef = useRef(null)

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
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            context.clearRect(0, 0, canvas.width, canvas.height);
            const roughCanvas = rough.canvas(canvas);
            props.rects?.forEach(rect => {
                const [x, y, w, h] = rect
                // const [x1, y1, w1, h1] = [x, y, w, h]
                // const [x1, y1, w1, h1] = [translatedX(canvas, x) / dimRatio.current.w, translatedY(canvas, y) / dimRatio.current.h, translatedY(canvas, w) / dimRatio.current.w, translatedX(canvas, h) / dimRatio.current.h]
                const [x1, y1, w1, h1] = [x / dimRatio.current.w, y / dimRatio.current.h, w / dimRatio.current.w, h / dimRatio.current.h]
                // const [x1, y1, w1, h1] = [translatedX(canvas, x), translatedY(canvas, y), translatedY(canvas, w), translatedX(canvas, h)]
                const r = generator.rectangle(x1 + imageRef.current.getBoundingClientRect().x - canvasRef.current.getBoundingClientRect().x, y1 + imageRef.current.getBoundingClientRect().y - canvasRef.current.getBoundingClientRect().y, w1, h1)
                console.log(x1, y1 + imageRef.current.getBoundingClientRect().y, w1, h1);
                roughCanvas.draw(r)
            })
        }

    }, [canvasRef.current, props.rects])

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e
        console.log(clientX, clientY - 907.875);
    }
    return <div className={style.imageBox} onClick={() => props.deleteImage(props.index)}>
        <canvas
            ref={canvasRef}
            id={`canvas${props.index}`}
            style={{
                position: 'absolute',
            }}
            // width={window.innerWidth}
            // height={window.innerHeight}
            // onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        ></canvas>
        <img ref={imageRef} className={style.image} src={URL.createObjectURL(props.image)} onLoad={onload} />

    </div>
}

export default ImageBox