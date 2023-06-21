import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import style from "./MainImage.module.less"
import ImagesContext from '../../utils/ImagesContext';
import rough from "roughjs/bundled/rough.esm";
import { Mutex } from 'async-mutex';

const generator = rough.generator();
const MainImage = () => {
    const { mainImage, setMainImage, bboxes, setFaceImages } = useContext(ImagesContext)

    const dimRatio = useRef({ h: 1, w: 1 })
    const inputFileRef = useRef()
    const imageRef = useRef(null)
    const canvasRef = useRef(null)
    const canvas1Ref = useRef(null)
    const cropImagesBase64Ref = useRef([])
    const mutex = new Mutex();

    const onSelect = (e) => {
        if (e.target.files?.length)
            setMainImage(e.target.files[0])
    }

    const deleteImage = useCallback((e) => {
        setMainImage(null)
        setFaceImages([])
    }, [])

    const detectFaces = useCallback((e) => {
        cropImagesBase64Ref.current = []
    }, [])
    useEffect(() => {
        document.addEventListener("deleteMainImage", deleteImage)
        document.addEventListener("detectFaces", detectFaces)

        return () => {
            document.removeEventListener("deleteMainImage", deleteImage)
            document.removeEventListener("detectFaces", detectFaces)
        }
    }, [deleteImage])

    const onload = (e) => {
        let image = imageRef.current;
        let hRatio = image.naturalHeight / image.height;
        let wRatio = image.naturalWidth / image.width;
        dimRatio.current = { h: hRatio, w: wRatio }
    }

    useLayoutEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const canvas1 = canvas1Ref.current;

            const context = canvas.getContext("2d");
            const context1 = canvas1.getContext("2d");

            canvas.style.width = "100%";


            canvas.style.height = "100%";

            canvas.width = canvas.offsetWidth;

            canvas.height = canvas.offsetHeight;

            context.clearRect(0, 0, canvas.width, canvas.height);

            const roughCanvas = rough.canvas(canvas);

            // context.drawImage(imageRef.current, 0, 0, imageRef.current.width, imageRef.current.height)
            bboxes.mainImage?.forEach((rect, index) => {
                const [x, y, w, h] = rect
                const [x1, y1, w1, h1] = [
                    (x / dimRatio.current.w) + imageRef.current.getBoundingClientRect().x - canvasRef.current.getBoundingClientRect().x,
                    (y / dimRatio.current.h) + imageRef.current.getBoundingClientRect().y - canvasRef.current.getBoundingClientRect().y,
                    w / dimRatio.current.w, h / dimRatio.current.h]

                const r = generator.rectangle(x1, y1, w1, h1)
                console.log(x1 + imageRef.current.getBoundingClientRect().x - canvasRef.current.getBoundingClientRect().x, y1 + imageRef.current.getBoundingClientRect().y - canvasRef.current.getBoundingClientRect().y, w1, h1);

                roughCanvas.draw(r)
                mutex.runExclusive(() => {
                    const image = new Image();
                    image.src = URL.createObjectURL(mainImage)
                    image.onload = () => {
                        canvas1.style.width = w;
                        canvas1.style.height = h;
                        canvas1.width = w;
                        canvas1.height = h;
                        context1.clearRect(0, 0, canvas1.width, canvas1.height);
                        context1.drawImage(image, x, y, w, h, 0, 0, w, h);
                        cropImagesBase64Ref.current.push(canvas1.toDataURL())
                        setFaceImages(cropImagesBase64Ref.current)

                    };
                })

            })

        }

    }, [canvasRef.current, bboxes, imageRef.current, mainImage, canvas1Ref.current])

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
                <canvas
                    ref={canvasRef}
                    id="canvas"
                    style={{
                        position: 'absolute',
                    }}
                    // width={window.innerWidth}
                    // height={window.innerHeight}
                    // onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                // onMouseUp={handleMouseUp}
                ></canvas>
                <img ref={imageRef} className={style.image} src={URL.createObjectURL(mainImage)} onLoad={onload} />
                {/* {moreCanvasRefs.map((ref, idx) => <canvas ref={ref} style={{ visibility: 'hidden', position: 'absolute' }} />)} */}
                <canvas ref={canvas1Ref} style={{ visibility: 'hidden', position: 'absolute' }} />
            </div>
        }

    </div>
}

export default MainImage