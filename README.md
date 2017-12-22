img-utils
=================

The img-utils is utility image library. It offers cropping feature.

## API

### setup(object)

Overwrite `createCanvas` when you need use other platform. The default platform is browser.

```js
imgUtils.setup({
  createCanvas: ()=> new Canvas()
})
```

### crop(canvas:Canvas)

Crop image space of top and bottom.

```js
imgUtils.crop(canvas)
```

