export const TrimCanvas = (canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const trimmedCanvas = document.createElement('canvas');
  trimmedCanvas.width = canvas.width;
  trimmedCanvas.height = canvas.height;
  const context = trimmedCanvas.getContext('2d');
  if (!context) return canvas;

  context.drawImage(canvas, 0, 0);

  const imgWidth = trimmedCanvas.width;
  const imgHeight = trimmedCanvas.height;
  const imgData = context.getImageData(0, 0, imgWidth, imgHeight).data;
  const cropTop = scanY(true, imgWidth, imgHeight, imgData);
  const cropBottom = scanY(false, imgWidth, imgHeight, imgData);
  const cropLeft = scanX(true, imgWidth, imgHeight, imgData);
  const cropRight = scanX(false, imgWidth, imgHeight, imgData);

  const cropXDiff = cropRight - cropLeft + 1;
  const cropYDiff = cropBottom - cropTop + 1;

  const trimmedData = context.getImageData(cropLeft, cropTop, cropXDiff, cropYDiff);

  trimmedCanvas.width = cropXDiff;
  trimmedCanvas.height = cropYDiff;
  context.clearRect(0, 0, cropXDiff, cropYDiff);
  context.putImageData(trimmedData, 0, 0);

  return trimmedCanvas;
}

const getRGBA = (x: number, y: number, imgWidth: number, imgData: Uint8ClampedArray) => {
  return {
    red: imgData[(imgWidth * y + x) * 4],
    green: imgData[(imgWidth * y + x) * 4 + 1],
    blue: imgData[(imgWidth * y + x) * 4 + 2],
    alpha: imgData[(imgWidth * y + x) * 4 + 3]
  }
}

const getAlpha = (x: number, y: number, imgWidth: number, imgData: Uint8ClampedArray) => getRGBA(x, y, imgWidth, imgData).alpha;

const scanY = (fromTop: boolean, imgWidth: number, imgHeight: number, imgData: Uint8ClampedArray) => {
  const offset = fromTop ? 1 : -1
  const firstCol = fromTop ? 0 : imgHeight - 1

  for (let y = firstCol; fromTop ? (y < imgHeight) : (y > -1); y += offset) {
    for (let x = 0; x < imgWidth; x++) {
      if (getAlpha(x, y, imgWidth, imgData)) return y;
    }
  }
  return 0;
}

const scanX = (fromLeft: boolean, imgWidth: number, imgHeight: number, imgData: Uint8ClampedArray) => {
  const offset = fromLeft ? 1 : -1
  const firstRow = fromLeft ? 0 : imgWidth - 1


  for (let x = firstRow; fromLeft ? (x < imgWidth) : (x > -1); x += offset) {
    for (let y = 0; y < imgHeight; y++) {
      if (getAlpha(x, y, imgWidth, imgData)) return x;
    }
  }
  return 0;
}
