export function translatedX(canvas, x) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.width / rect.width;
    return factor * (x - rect.left);
}

export function translatedY(canvas, y) {
    var rect = canvas.getBoundingClientRect();
    var factor = canvas.height / rect.height;
    return factor * (y - rect.top);
}