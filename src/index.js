
import {R,G,B,A,POINT_OFFSET} from './constants/ImageData';

let defaults = {
  createCanvas:()=> document.createElement('canvas')
};

let findDrawn = (imgData, containFunc, incFunc, currentCursor = 0)=> {
  let cursor = 0;
  let width = imgData.width;
  let data = imgData.data;

  for(let i = currentCursor; containFunc(i, data) ;i = incFunc(i)) {
    let total = data[i + R] + data[i + G] + data[i + B] + data[i + A];
    if (total > 0) {
      cursor = i;
      break;
    }
  }

  return Math.round(cursor / (width * POINT_OFFSET));
}

let findDrawnTop = (imgData)=> {
  return findDrawn(imgData, (i, data)=> i < data.length, (i)=> i + POINT_OFFSET);
};

let findDrawnBottom = (imgData)=> {
  return findDrawn(imgData, (i, data)=> i > 0, (i)=> i - POINT_OFFSET, imgData.data.length - 1);
};

let drawFrom = (fromCanvas, dx, dy, width, height)=> {
  let canvas = defaults.createCanvas(); 
  canvas.width = width;
  canvas.height = height;
  let ctx = canvas.getContext('2d');
  ctx.drawImage(fromCanvas, dx, dy, width, height, 0, 0, width, height);
  return canvas;
};

export const setup = (opts)=> {
  for(let name in opts) {
    defaults[name] = opts[name];
  }
};

export const crop = (canvas)=>{
  let ctx = canvas.getContext('2d');
  let {width, height} = canvas;
  let imgData = ctx.getImageData(0, 0, width, height);
  let top  = findDrawnTop(imgData);
  let bottom = findDrawnBottom(imgData);
  return drawFrom(canvas, 0, top, width, height - top - (height - bottom));
};

