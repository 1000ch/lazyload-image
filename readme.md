# [`<lazyload-image>`](http://1000ch.github.io/lazyload-image)

HTMLImageElement extension for lazy loading. Images will be loaded when they are shown.

![](assets/lazy-sloth.jpg)

Photo by [Susana Fernandez](https://www.flickr.com/photos/susivinh/6970379146)

## Install

Install `lazyload-image` via npm or bower.

```bash
# via npm
$ npm install lazyload-image

# via bower
$ bower install lazyload-image
```

## Usage

Load `lazyload-image.js` in your JavaScript.

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
  height="100">
```

## Fallback

If a browser does not support `customElements.define()`, images will be loaded as usual.

## License

[MIT](https://1000ch.mit-license.org) © [Shogo Sensui](https://github.com/1000ch)
