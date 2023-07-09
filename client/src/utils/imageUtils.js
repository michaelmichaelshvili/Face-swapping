import React, { useRef } from "react";

export function urltoFile(url, filename, mimeType = "image/jpeg") {
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, { type: mime || mimeType });
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename, { type: mimeType }));
}


export const CropImage = async ({ image, bbox, onCrop }) => {
    const cropCanvasRef = useRef(null)
    const cropCanvas = cropCanvasRef.current;
    const context = cropCanvas.getContext("2d");
    const [x, y, w, h] = bbox
    cropCanvas.style.width = w;
    cropCanvas.style.height = h;
    cropCanvas.width = w;
    cropCanvas.height = h;
    context.clearRect(0, 0, cropCanvas.width, cropCanvas.height);
    const imageFile = await urltoFile(image, "merged imaged")
    const newImage = new Image();
    newImage.src = URL.createObjectURL(imageFile)
    newImage.onload = () => {
        context.drawImage(newImage, 0, 0, newImage.width, newImage.height, 0, 0, w, h);
        onCrop(cropCanvas.toDataURL())
    };

    return <canvas ref={cropCanvasRef} style={{ visibility: 'hidden', position: 'absolute' }} />

}