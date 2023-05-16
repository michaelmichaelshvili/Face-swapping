import axios from "axios";

const server = axios.create({ baseURL: 'http://localhost:5000' })

export const detectFaces = async (mainImage, replacedImages) => {
    const form = new FormData()
    form.append(`mainImage`, mainImage, mainImage.name);
    replacedImages.forEach((image, i) => {
        form.append(`replaceImage-${i}`, image, image.name);
      });
    const rects = await server.post("/extractFaces", form)
    console.log(rects);

}