🚩 Finally [Native lazy-loading for the web](https://web.dev/native-lazy-loading/) was introduced. I recommend you to use [`loading` attribute](https://html.spec.whatwg.org/#lazy-loading-attributes) instead.

# lazyload-image

[HTMLImageElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement) extension for lazy loading. Images will be loaded when they are shown.

## Install

Install `lazyload-image` via npm.

```bash
$ npm install lazyload-image
```

## Usage

Import `lazyload-image.js` and register it.

```javascript
import LazyloadImage from './lazyload-image.js';

customElements.define('lazyload-image', LazyloadImage, {
  extends: 'img'
});
```

Modify your `<img>` elements such as following.

```html
<img
  is="lazyload-image"
  src="path/to/your/image.jpg"
  offset="200px"
  width="100"
  height="100"
>
```

## Fallback

If a browser does not support `customElements.define()`, images will be loaded as usual.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
